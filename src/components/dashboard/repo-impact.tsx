import { RepoImpact } from "@/utils/scoring";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, GitFork, Trophy } from "lucide-react";

export function RepoImpactList({ impactRepos }: { impactRepos: RepoImpact[] }) {
    return (
        <Card className="border-white/5 bg-transparent overflow-hidden rounded-[40px]">
            <CardHeader className="pb-4">
                <CardTitle className="text-[10px] uppercase tracking-[0.3em] font-black flex items-center gap-3 text-primary">
                    <Trophy className="w-4 h-4" />
                    Neural High Impact Sequences
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-6 pb-10">
                {impactRepos.map((repo, idx) => (
                    <div key={repo.name} className="flex items-center justify-between p-5 rounded-3xl bg-white/5 group hover:bg-white/10 transition-all duration-500 border border-white/5 hover:border-primary/20">
                        <div className="flex flex-col gap-1">
                            <span className="font-black text-[13px] tracking-tight text-white uppercase">{repo.name}</span>
                            <div className="flex items-center gap-4">
                                <Badge variant="outline" className="text-[9px] px-2 py-0 font-black border-primary/20 text-primary uppercase">{repo.language}</Badge>
                                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/60 font-black">
                                    <Star className="w-3 h-3 text-primary fill-primary/20" /> {repo.stars}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-[8px] text-muted-foreground/40 font-black uppercase tracking-widest mb-1">Index</div>
                            <div className="text-xl font-black text-white tracking-tighter">{repo.score}</div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
