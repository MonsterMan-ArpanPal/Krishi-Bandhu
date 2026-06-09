import { NextResponse } from "next/server";

interface TelemetryReading {
  temp: number;
  humidity: number;
  moisture: number;
  light: number;
  timestamp: string;
}

// Attach buffer to globalThis to preserve it during hot reloads
const globalWithTelemetry = globalThis as typeof globalThis & {
  telemetryHistory?: TelemetryReading[];
};

globalWithTelemetry.telemetryHistory ??= [];

export async function GET() {
  return NextResponse.json(globalWithTelemetry.telemetryHistory ?? []);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const { temp, humidity, moisture, light } = body;

    if (
      typeof temp !== "number" ||
      typeof humidity !== "number" ||
      typeof moisture !== "number" ||
      typeof light !== "number"
    ) {
      return NextResponse.json({ error: "Invalid sensor data format" }, { status: 400 });
    }

    const reading: TelemetryReading = {
      temp: parseFloat(temp.toFixed(1)),
      humidity: Math.round(humidity),
      moisture: Math.round(moisture),
      light: Math.round(light),
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
    };

    const history = globalWithTelemetry.telemetryHistory ?? [];
    history.push(reading);

    // Limit buffer to last 40 readings for clean UI sparkline trend tracking
    if (history.length > 40) {
      history.shift();
    }
    globalWithTelemetry.telemetryHistory = history;

    return NextResponse.json({ success: true, reading });
  } catch {
    return NextResponse.json({ error: "Failed to parse request body" }, { status: 400 });
  }
}
