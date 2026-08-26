'use client'

import { useEffect, useState } from 'react'
import { Wind, Droplets, MapPin, RefreshCw, X, ChevronUp, ChevronDown } from 'lucide-react'

interface WeatherData {
  city: string
  country: string
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  condition: string
  icon: string
}

const WMO: Record<number, { label: string; icon: string }> = {
  0:  { label: 'Clear sky',          icon: '☀️' },
  1:  { label: 'Mainly clear',       icon: '🌤️' },
  2:  { label: 'Partly cloudy',      icon: '⛅' },
  3:  { label: 'Overcast',           icon: '☁️' },
  45: { label: 'Foggy',              icon: '🌫️' },
  48: { label: 'Icy fog',            icon: '🌫️' },
  51: { label: 'Light drizzle',      icon: '🌦️' },
  61: { label: 'Light rain',         icon: '🌧️' },
  63: { label: 'Rain',               icon: '🌧️' },
  65: { label: 'Heavy rain',         icon: '🌧️' },
  80: { label: 'Showers',            icon: '🌦️' },
  95: { label: 'Thunderstorm',       icon: '⛈️' },
}

type Status = 'idle' | 'locating' | 'loading' | 'done' | 'error'

export default function WeatherWidget() {
  const [weather, setWeather]     = useState<WeatherData | null>(null)
  const [status, setStatus]       = useState<Status>('idle')
  const [denied, setDenied]       = useState(false)
  const [expanded, setExpanded]   = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const fetchWeather = () => {
    if (!navigator.geolocation) { setStatus('error'); return }
    setStatus('locating')
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        setStatus('loading')
        try {
          const { latitude: lat, longitude: lon } = coords
          const [weatherRes, geoRes] = await Promise.all([
            fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
              `&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m` +
              `&timezone=auto&wind_speed_unit=kmh`
            ),
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`),
          ])

          if (!weatherRes.ok) throw new Error('weather')
          const w   = await weatherRes.json()
          const geo = geoRes.ok ? await geoRes.json() : null
          const c   = w.current
          const wmo = WMO[c.weather_code as number] ?? { label: 'Unknown', icon: '🌡️' }

          setWeather({
            city:        geo?.address?.city ?? geo?.address?.town ?? geo?.address?.village ?? 'Your Location',
            country:     geo?.address?.country_code?.toUpperCase() ?? '',
            temperature: Math.round(c.temperature_2m),
            feelsLike:   Math.round(c.apparent_temperature),
            humidity:    c.relative_humidity_2m,
            windSpeed:   Math.round(c.wind_speed_10m),
            condition:   wmo.label,
            icon:        wmo.icon,
          })
          setStatus('done')
        } catch { setStatus('error') }
      },
      (err) => {
        if (err.code === 1) setDenied(true)
        setStatus('error')
      },
      { timeout: 10000 }
    )
  }

  useEffect(() => { fetchWeather() }, [])

  if (dismissed || denied) return null

  const base = 'fixed bottom-5 left-5 z-40 rounded-2xl border border-white/12 bg-dark-900/92 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]'

  if (status === 'idle' || status === 'locating' || status === 'loading') {
    return (
      <div className={`${base} flex items-center gap-2.5 px-4 py-3 text-gray-500`}>
        <span className="text-xl animate-pulse">🌍</span>
        <span className="text-xs">{status === 'locating' ? 'Detecting location…' : 'Loading weather…'}</span>
      </div>
    )
  }

  if (status === 'error') return null
  if (!weather) return null

  return (
    <div className={`${base} w-56 overflow-hidden transition-all duration-300`}>
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-white/4 transition-colors"
      >
        <span className="text-2xl leading-none">{weather.icon}</span>
        <div className="flex-1 text-left">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-white">{weather.temperature}°C</span>
            <span className="text-xs text-gray-500 truncate max-w-[80px]">{weather.city}</span>
          </div>
          <p className="text-[11px] text-gray-600 leading-none mt-0.5">{weather.condition}</p>
        </div>
        {expanded
          ? <ChevronDown className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
          : <ChevronUp className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />}
      </button>

      {expanded && (
        <>
          <div className="h-px bg-white/8" />
          <div className="flex items-center justify-between px-3.5 py-2">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />
              {weather.city}{weather.country ? `, ${weather.country}` : ''}
            </span>
            <div className="flex items-center gap-1">
              <button onClick={fetchWeather} title="Refresh"
                className="p-1 text-gray-600 hover:text-gray-400 transition-colors">
                <RefreshCw className="w-3 h-3" />
              </button>
              <button onClick={() => setDismissed(true)} title="Close"
                className="p-1 text-gray-600 hover:text-gray-400 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="px-3.5 pb-2 text-xs text-gray-600">
            Feels like <span className="text-gray-400">{weather.feelsLike}°C</span>
          </div>
          <div className="flex items-center gap-4 px-3.5 pb-3 border-t border-white/6 pt-2">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
              {weather.humidity}% humidity
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Wind className="w-3.5 h-3.5 text-cyan-400" />
              {weather.windSpeed} km/h
            </span>
          </div>
        </>
      )}
    </div>
  )
}
