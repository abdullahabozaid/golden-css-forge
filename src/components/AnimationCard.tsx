
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface AnimationCardProps {
  title: string;
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  children: React.ReactNode;
}

const AnimationCard = ({ title, enabled, onEnabledChange, children }: AnimationCardProps) => {
  return (
    <Card className="border-gray-200">
      <Collapsible open={enabled} onOpenChange={onEnabledChange}>
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={enabled}
                onCheckedChange={onEnabledChange}
                className="border-gold data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                onClick={(e) => e.stopPropagation()}
              />
              <CardTitle className="text-lg text-gold">{title}</CardTitle>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-4">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default AnimationCard;
