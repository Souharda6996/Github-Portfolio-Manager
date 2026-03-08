import { GithubUser } from "@/features/github/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Link as LinkIcon, Calendar, Users, BookOpen } from "lucide-react";

export function ProfileCard({ user }: { user: GithubUser }) {
    return (
        <Card className="border-none bg-secondary/30 backdrop-blur-md overflow-hidden">
            <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4 group">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all duration-500" />
                        <img
                            src={user.avatar_url}
                            alt={user.login}
                            className="relative w-24 h-24 rounded-full border-2 border-primary/50 p-1 bg-background"
                        />
                    </div>

                    <h2 className="text-2xl font-bold text-foreground">{user.name || user.login}</h2>
                    <p className="text-primary font-bold mb-4">@{user.login}</p>

                    {user.bio && (
                        <p className="text-sm text-foreground/80 mb-6 leading-relaxed font-medium">
                            {user.bio}
                        </p>
                    )}

                    <div className="grid grid-cols-2 gap-4 w-full mb-6">
                        <div className="flex flex-col items-center p-3 rounded-xl bg-background/40">
                            <span className="text-xl font-bold text-foreground">{user.public_repos}</span>
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Repos</span>
                        </div>
                        <div className="flex flex-col items-center p-3 rounded-xl bg-background/40">
                            <span className="text-xl font-bold text-foreground">{user.followers}</span>
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Followers</span>
                        </div>
                    </div>

                    <div className="space-y-3 w-full text-left text-sm text-foreground/80 font-medium">
                        {user.location && (
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>{user.location}</span>
                            </div>
                        )}
                        {user.blog && (
                            <div className="flex items-center gap-3">
                                <LinkIcon className="w-4 h-4 text-primary" />
                                <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" className="hover:text-primary transition-colors truncate">
                                    {user.blog.replace(/^https?:\/\//, '')}
                                </a>
                            </div>
                        )}
                        <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>Joined {new Date(user.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
