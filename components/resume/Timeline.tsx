interface TimelineItem {
  company: string;
  location: string;
  position: string;
  period: string;
  responsibilities: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-8">
      {items.map((item, index) => (
        <div key={index} className="relative pl-8 pb-8 border-l-2 border-primary/20 last:border-l-0">
          <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full shadow-lg"></div>
          
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-primary mb-1">
                {item.company} ({item.location}) - {item.position}
              </h3>
            </div>
            <span className="text-sm text-muted-foreground italic bg-muted/50 px-2 py-1 rounded-md">
              {item.period}
            </span>
          </div>
          
          <ul className="space-y-2 text-muted-foreground">
            {item.responsibilities.map((responsibility, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}