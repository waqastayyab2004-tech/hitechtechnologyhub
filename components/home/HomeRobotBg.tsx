'use client'

import RobotCommunity from '@/components/ui/RobotCommunity'

export default function HomeRobotBg() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <RobotCommunity className="opacity-20" />
    </div>
  )
}
