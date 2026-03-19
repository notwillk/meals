export function parseDurationMs(durationStr: string | undefined | null): number {
  if (!durationStr) return 0;
  const match = durationStr.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);
  return (hours * 3600 + minutes * 60 + seconds) * 1000;
}

export function formatDuration(durationStr: string | undefined | null): string | null {
  if (!durationStr) return null;
  const match = durationStr.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return durationStr;

  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
}

export function formatNumeric(value: number): string {
  const num = parseFloat(value.toFixed(2));
  return num.toString();
}

export function getPhaseOffsetStr(phaseTime: string, serviceTime: number): string | null {
  if (!phaseTime) return null;
  const phaseMs = new Date(phaseTime).getTime();
  const offsetMs = phaseMs - serviceTime;
  const offsetSec = Math.round(offsetMs / 1000);

  if (offsetSec === 0) {
    return 'T=0';
  }

  const prefix = offsetSec > 0 ? 'T+' : 'T-';
  const absSec = Math.abs(offsetSec);

  if (absSec < 60) {
    return `${prefix}${absSec}s`;
  }

  const absMin = absSec / 60;
  if (absMin < 60) {
    return `${prefix}${formatNumeric(absMin)}m`;
  }

  const absHrs = absSec / 3600;
  return `${prefix}${formatNumeric(absHrs)}h`;
}

export function getPhaseTimeStr(phaseTime: string): string | null {
  if (!phaseTime) return null;
  const dt = new Date(phaseTime);
  let hours = dt.getHours();
  const minutes = dt.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  return `${hours}:${minutes}${ampm}`;
}
