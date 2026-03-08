"use client";

import { useState } from "react";
import { GithubRepo } from "@/features/github/api";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, Star, Boxes } from "lucide-react";

export function RepoTable({ repos }: { repos: GithubRepo[] }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredRepos = repos.filter(repo =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.language && repo.language.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div id="repos" className="space-y-8 scroll-mt-24 p-10 rounded-[50px] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-2xl font-black mb-2 flex items-center gap-3 tracking-tighter uppercase">
                        <Boxes className="w-7 h-7 text-primary" />
                        Codebase Inventory
                    </h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">Decrypting active repository modules...</p>
                </div>
                <div className="relative w-full md:w-80 group">
                    <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="FILTER SEQUENCES..."
                            className="pl-12 h-14 bg-black/40 border-white/10 rounded-[20px] focus-visible:ring-primary/40 text-xs font-black uppercase tracking-widest placeholder:text-muted-foreground/20 text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="rounded-[30px] border border-white/5 overflow-hidden bg-black/20 backdrop-blur-md">
                <Table>
                    <TableHeader className="bg-white/5 border-b border-white/5">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="text-[9px] uppercase tracking-[0.3em] font-black text-primary px-8 h-14">Identity</TableHead>
                            <TableHead className="text-[9px] uppercase tracking-[0.3em] font-black text-primary h-14">Core Tech</TableHead>
                            <TableHead className="text-[9px] uppercase tracking-[0.3em] font-black text-primary h-14 text-right">Stars</TableHead>
                            <TableHead className="text-[9px] uppercase tracking-[0.3em] font-black text-primary h-14 text-right pr-8">Link</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredRepos.map((repo) => (
                            <TableRow
                                key={repo.id}
                                className="group border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                            >
                                <TableCell className="font-bold py-6 px-8">
                                    <div className="flex flex-col">
                                        <span className="text-white text-sm font-black tracking-tight group-hover:text-primary transition-colors">{repo.name}</span>
                                        <span className="text-[10px] text-muted-foreground/40 line-clamp-1 font-medium uppercase mt-1 tracking-tighter">
                                            {repo.description || "No metadata provided."}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {repo.language ? (
                                        <Badge variant="outline" className="text-[9px] border-primary/20 text-primary font-black uppercase bg-primary/5 px-3 py-0.5">
                                            {repo.language}
                                        </Badge>
                                    ) : (
                                        <span className="text-[9px] text-muted-foreground/20 font-black uppercase tracking-widest">Undefined</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-1.5 font-black text-sm text-white">
                                        <Star className="w-3 h-3 text-primary fill-primary/20" />
                                        {repo.stargazers_count}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right pr-8">
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        className="inline-flex items-center justify-center p-2 rounded-xl bg-white/5 border border-white/5 text-muted-foreground/40 hover:text-primary hover:border-primary/40 transition-all group/link"
                                    >
                                        <ExternalLink className="w-4 h-4 group-hover/link:rotate-45 transition-transform" />
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
