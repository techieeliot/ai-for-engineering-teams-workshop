/** Placeholder tile for a not-yet-built dashboard widget. */
export function DashboardWidgetDemo({
  widgetName,
  exerciseNumber,
}: {
  widgetName: string;
  exerciseNumber: number;
}) {
  return (
    <div className="rounded-lg border-2 border-dashed border-border p-4 text-center text-sm text-muted-foreground">
      {widgetName}
      <br />
      <span className="text-xs">Exercise {exerciseNumber}</span>
    </div>
  );
}
