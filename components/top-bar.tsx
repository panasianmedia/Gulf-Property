"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Cloud, CloudRain, CloudSnow, LoaderCircle, Sun, Wind } from "lucide-react"
import { SocialLinks } from "@/components/social-links"

type WeatherState = {
  tempC: number
  condition: string
}

const DEFAULT_LOCATION = { latitude: 25.2048, longitude: 55.2708 }

function getWeatherCondition(code: number): string {
  if (code === 0) return "Sunny"
  if (code === 1) return "Mostly Sunny"
  if (code === 2) return "Partly Cloudy"
  if (code === 3) return "Cloudy"
  if (code === 45 || code === 48) return "Fog"
  if (code >= 51 && code <= 67) return "Rain"
  if (code >= 71 && code <= 77) return "Snow"
  if (code >= 80 && code <= 82) return "Rain Showers"
  if (code >= 85 && code <= 86) return "Snow Showers"
  if (code >= 95 && code <= 99) return "Thunderstorm"

  return "Unknown"
}

function getWeatherIcon(condition: string) {
  switch (condition) {
    case "Rain":
      return CloudRain
    case "Snow":
      return CloudSnow
    case "Fog":
      return LoaderCircle
    case "Wind":
      return Wind
    case "Cloudy":
      return Cloud
    default:
      return Sun
  }
}

export function TopBar() {
  const [weather, setWeather] = useState<WeatherState | null>(null)
  const [loading, setLoading] = useState(true)

  const today = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    [],
  )

  useEffect(() => {
    let cancelled = false

    const fetchWeather = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`,
        )
        const data = await response.json()

        if (!cancelled && data?.current) {
          const condition = getWeatherCondition(data.current.weather_code)
          setWeather({
            tempC: Math.round(data.current.temperature_2m),
            condition,
          })
        }
      } catch {
        if (!cancelled) {
          setWeather({ tempC: 24, condition: "Clear" })
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    const updateWeather = () => {
      if (typeof navigator !== "undefined" && "geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => fetchWeather(coords.latitude, coords.longitude),
          () => fetchWeather(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude),
          { enableHighAccuracy: false, timeout: 10000 },
        )
      } else {
        fetchWeather(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude)
      }
    }

    updateWeather()

    const intervalId = window.setInterval(updateWeather, 10 * 60 * 1000)
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        updateWeather()
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange)
    window.addEventListener("focus", updateWeather)

    return () => {
      cancelled = true
      window.clearInterval(intervalId)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      window.removeEventListener("focus", updateWeather)
    }
  }, [])

  const WeatherIcon = getWeatherIcon(weather?.condition ?? "Clear")

  return (
  <div className="bg-black text-white">
    <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-4 py-2 text-xs">
      
      {/* 1. Left empty space (keeps center aligned) */}
      <div className="hidden md:block">
        <SocialLinks variant="inverted" />
      </div>

      {/* 2. Center: Date & Weather */}
      <div className="hidden shrink-0 items-center justify-center gap-4 md:flex">
        <span className="font-medium text-gray-300">{today}</span>
        <span className="flex items-center gap-1.5 text-gray-300">
          {loading ? (
            <LoaderCircle className="h-3.5 w-3.5 animate-spin text-gray-400" aria-hidden />
          ) : (
            <>
              <WeatherIcon className="h-3.5 w-3.5 text-yellow-400" aria-hidden />
              <span>{weather?.tempC ?? 24}&deg;C</span>
              <Cloud className="ml-2 h-3.5 w-3.5 text-gray-400" aria-hidden />
              <span>{weather?.condition ?? "Clear"}</span>
            </>
          )}
        </span>
      </div>

      {/* 3. Right: Header Links */}
      <nav className="col-span-3 flex items-center justify-end gap-4 text-gray-300 md:col-span-1">
        <Link href="/about" className="transition-colors hover:text-white">
          About
        </Link>
        <Link href="/advertise" className="transition-colors hover:text-white">
          Advertise
        </Link>
        <Link href="/contact" className="transition-colors hover:text-white">
          Contact
        </Link>
      </nav>

    </div>
  </div>
)
}