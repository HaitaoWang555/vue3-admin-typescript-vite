/* eslint-disable no-async-promise-executor */
import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export type ITagsView = {
  visitedViews: RouteLocationNormalizedLoaded[]
  cachedViews: string[]
}

// useTagsViewStore
export const useTagsViewStore = defineStore({
  id: 'useTagsViewStore',
  state: (): ITagsView => ({
    visitedViews: [],
    cachedViews: [],
  }),
  getters: {},
  actions: {
    async addView(view: RouteLocationNormalizedLoaded) {
      this.addVisitedView(view)
      this.addCachedView(view)
    },
    async addVisitedView(view: RouteLocationNormalizedLoaded) {
      if (this.visitedViews.some((v) => v.path === view.path)) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || 'no-name',
        })
      )
    },
    async addCachedView(view: RouteLocationNormalizedLoaded) {
      if (this.cachedViews.includes(view.name as string)) return
      if (!view.meta?.noCache) {
        this.cachedViews.push(view.name as string)
      }
    },
    async delView(view: RouteLocationNormalizedLoaded): Promise<ITagsView> {
      return new Promise(async (resolve) => {
        await this.delVisitedView(view)
        await this.delCachedView(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        })
      })
    },
    async delVisitedView(
      view: RouteLocationNormalizedLoaded
    ): Promise<RouteLocationNormalizedLoaded[]> {
      return new Promise((resolve) => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1)
            break
          }
        }
        resolve([...this.visitedViews])
      })
    },
    async delCachedView(
      view: RouteLocationNormalizedLoaded
    ): Promise<string[]> {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name as string)
        index > -1 && this.cachedViews.splice(index, 1)
        resolve([...this.cachedViews])
      })
    },
    async delOthersViews(
      view: RouteLocationNormalizedLoaded
    ): Promise<ITagsView> {
      return new Promise(async (resolve) => {
        await this.delOthersVisitedViews(view)
        await this.delOthersCachedViews(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        })
      })
    },
    async delOthersVisitedViews(
      view: RouteLocationNormalizedLoaded
    ): Promise<RouteLocationNormalizedLoaded[]> {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v) => {
          return v.meta?.affix || v.path === view.path
        })
        resolve([...this.visitedViews])
      })
    },
    async delOthersCachedViews(
      view: RouteLocationNormalizedLoaded
    ): Promise<string[]> {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name as string)
        if (index > -1) {
          this.cachedViews = this.cachedViews.slice(index, index + 1)
        } else {
          // if index = -1, there is no cached tags
          this.cachedViews = []
        }
        resolve([...this.cachedViews])
      })
    },

    async delAllViews(): Promise<ITagsView> {
      return new Promise(async (resolve) => {
        await this.delAllVisitedViews()
        await this.delAllCachedViews()
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        })
      })
    },
    async delAllVisitedViews(): Promise<RouteLocationNormalizedLoaded[]> {
      return new Promise((resolve) => {
        const affixTags = this.visitedViews.filter((tag) => tag.meta?.affix)
        this.visitedViews = affixTags
        resolve([...this.visitedViews])
      })
    },
    async delAllCachedViews(): Promise<string[]> {
      return new Promise((resolve) => {
        this.cachedViews = []
        resolve([...this.cachedViews])
      })
    },

    async updateVisitedView(
      view: RouteLocationNormalizedLoaded
    ): Promise<void> {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    },
  },
})
