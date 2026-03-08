"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageStat } from "@/utils/languageExtractor";

export function LanguageGraph({ stats }: { stats: LanguageStat[] }) {
    const data = stats.slice(0, 8);

    return (
        <Card className="border-none bg-secondary/30 backdrop-blur-md h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">Language Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ left: 20, right: 30 }}>
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="language"
                            type="category"
                            tick={{ fill: '#888', fontSize: 12 }}
                            width={80}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                            formatter={(value: number) => [`${value}%`, 'Proficiency']}
                        />
                        <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
