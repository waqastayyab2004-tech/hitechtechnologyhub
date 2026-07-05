---
title: "Windows Automation Tips"
date: "2026-06-20"
excerpt: "Practical PowerShell and Task Scheduler tips for automating repetitive Windows Server and workstation tasks in enterprise environments."
tags: ["Windows", "PowerShell", "Automation", "IT Admin"]
author: "Waqas Syed"
readTime: "9 min read"
featured: false
---

# Windows Automation Tips

If you're still doing the same Windows admin tasks manually every week, this post is for you. Here are the most valuable automation patterns I've collected over years of enterprise IT work.

## 1. Schedule Any Task with Task Scheduler

Task Scheduler is underutilized. You can schedule any PowerShell script to run automatically:

```powershell
# Create a scheduled task via PowerShell
$action = New-ScheduledTaskAction -Execute 'PowerShell.exe' `
    -Argument '-NonInteractive -WindowStyle Hidden -File "C:\Scripts\cleanup.ps1"'
$trigger = New-ScheduledTaskTrigger -Daily -At '9:00AM'
$settings = New-ScheduledTaskSettingsSet -RunOnlyIfNetworkAvailable
Register-ScheduledTask -TaskName 'DailyCleanup' -Action $action `
    -Trigger $trigger -Settings $settings -RunLevel Highest
```

## 2. Bulk AD User Management

### Export Inactive Users
```powershell
# Export users who haven't logged in for 90 days
$cutoff = (Get-Date).AddDays(-90)
Get-ADUser -Filter {LastLogonDate -lt $cutoff -and Enabled -eq $true} `
    -Properties LastLogonDate, Department, Manager |
    Select-Object Name, SamAccountName, LastLogonDate, Department |
    Export-Csv "C:\Reports\InactiveUsers_$(Get-Date -f yyyyMMdd).csv" -NoTypeInformation
Write-Host "Report saved."
```

### Bulk Disable Users from CSV
```powershell
Import-Csv "users_to_disable.csv" | ForEach-Object {
    try {
        Disable-ADAccount -Identity $_.SamAccountName
        Write-Host "Disabled: $($_.SamAccountName)" -ForegroundColor Green
    } catch {
        Write-Warning "Failed: $($_.SamAccountName) - $_"
    }
}
```

## 3. Automated Disk Space Monitoring

```powershell
# Email alert when any drive drops below 15% free
$threshold = 15
$disks = Get-WmiObject Win32_LogicalDisk -Filter "DriveType=3"
$lowDisks = $disks | Where-Object {
    ($_.FreeSpace / $_.Size * 100) -lt $threshold
}

if ($lowDisks) {
    $body = $lowDisks | ForEach-Object {
        "$($_.DeviceID): $([math]::Round($_.FreeSpace/1GB,1)) GB free of $([math]::Round($_.Size/1GB,1)) GB"
    } | Out-String

    Send-MailMessage -To "it-team@company.com" -From "monitor@company.com" `
        -Subject "Low Disk Space Alert - $env:COMPUTERNAME" `
        -Body $body -SmtpServer "mail.company.com"
}
```

## 4. Windows Update Automation

```powershell
# Install PSWindowsUpdate module first: Install-Module PSWindowsUpdate
# Check for updates and install automatically
Import-Module PSWindowsUpdate
Get-WindowsUpdate -AcceptAll -AutoReboot -Verbose | 
    Select-Object KB, Title, Size, Status |
    Export-Csv "C:\Logs\Updates_$(Get-Date -f yyyyMMdd).csv" -NoTypeInformation
```

## 5. Remote PC Health Check

```powershell
function Get-PCHealth {
    param([string[]]$ComputerNames)
    
    $results = foreach ($pc in $ComputerNames) {
        if (Test-Connection $pc -Count 1 -Quiet) {
            $os = Get-WmiObject Win32_OperatingSystem -ComputerName $pc
            $disk = Get-WmiObject Win32_LogicalDisk -ComputerName $pc -Filter "DeviceID='C:'"
            [PSCustomObject]@{
                Computer    = $pc
                Status      = 'Online'
                Uptime      = [math]::Round((New-TimeSpan $os.ConvertToDateTime($os.LastBootUpTime)).TotalHours, 1)
                FreeGB      = [math]::Round($disk.FreeSpace/1GB, 1)
                MemFreeGB   = [math]::Round($os.FreePhysicalMemory/1MB, 1)
            }
        } else {
            [PSCustomObject]@{ Computer = $pc; Status = 'Offline' }
        }
    }
    $results | Format-Table -AutoSize
}

# Usage
Get-PCHealth -ComputerNames 'PC001','PC002','PC003'
```

## 6. Event Log Monitoring

```powershell
# Find all failed login attempts in the last 24 hours
$since = (Get-Date).AddHours(-24)
Get-WinEvent -FilterHashtable @{
    LogName = 'Security'
    Id = 4625
    StartTime = $since
} -ErrorAction SilentlyContinue |
    Select-Object TimeCreated, 
        @{N='Username'; E={$_.Properties[5].Value}},
        @{N='SourceIP'; E={$_.Properties[19].Value}} |
    Group-Object Username |
    Sort-Object Count -Descending |
    Select-Object -First 10 |
    Format-Table -AutoSize
```

## 7. Software Inventory

```powershell
# Get installed software from a list of PCs
$computers = Get-Content "servers.txt"
$inventory = foreach ($pc in $computers) {
    Get-WmiObject Win32_Product -ComputerName $pc |
        Select-Object @{N='Computer'; E={$pc}}, Name, Version, InstallDate
}
$inventory | Export-Csv "SoftwareInventory.csv" -NoTypeInformation
```

## My Top 3 Automation Wins

1. **Scheduled user offboarding** — When HR submits a form, a Power Automate flow triggers a PowerShell script that disables the AD account, removes group memberships, and sets an OOO reply. What used to take 20 minutes now takes 0 minutes.

2. **Daily disk space report** — A cron-style Task Scheduler job emails the IT team every morning with any servers below 20% free disk space.

3. **WSUS compliance report** — Weekly PowerShell script exports patch compliance for all servers to a SharePoint Excel file, automatically.

## Quick Reference — Most Useful PowerShell Commands

```powershell
# Find large files
Get-ChildItem C:\ -Recurse -ErrorAction SilentlyContinue |
    Sort-Object Length -Descending | Select-Object -First 20 FullName, Length

# Clear temp files
Remove-Item "$env:TEMP\*" -Recurse -Force -ErrorAction SilentlyContinue

# Check which process is using a port
netstat -ano | findstr :8080
Get-Process -Id (netstat -ano | findstr :8080 | ForEach-Object { ($_ -split '\s+')[-1] })

# Force Group Policy update on remote PC
Invoke-Command -ComputerName PC001 -ScriptBlock { gpupdate /force }
```

Start with one automation this week. Even saving 10 minutes per day is 40 hours per year.
