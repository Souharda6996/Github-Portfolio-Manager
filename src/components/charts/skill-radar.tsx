"use client";

import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageStat } from "@/utils/languageExtractor";

export function SkillRadar({ stats }: { stats: LanguageStat[] }) {
    // Take top 6-7 languages for the radar chart
    const data = stats.slice(0, 6).map(s => ({
        subject: s.language,
        A: s.percentage,
        fullMark: 100,
    }));

    return (
        <Card className="border-none bg-secondary/30 backdrop-blur-md h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">Skill Matrix</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] p-0">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid stroke="#333" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Proficiency"
                            dataKey="A"
                            stroke="var(--color-primary)"
                            fill="var(--color-primary)"
                            fillOpacity={0.4}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
