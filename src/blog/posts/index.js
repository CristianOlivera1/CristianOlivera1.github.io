import * as copilotPost from './copilot-billing-death'
import * as githubBreachPost from './github-internal-repositories-breach-2026'

export const posts = [copilotPost, githubBreachPost]

export const getPostBySlug = (slug) =>
  posts.find(p => p.meta.slug === slug) ?? null

export const getRecentPosts = (count = 4, excludeSlug = null) =>
  posts
    .filter(p => p.meta.slug !== excludeSlug)
    .sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
    .slice(0, count)
