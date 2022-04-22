import { defineStore } from 'pinia'
import axios from 'axios'

export const useCatCond = defineStore('cat_cond', {
  state: () => {
    return {
      categories: null,
      conditions: null
    }
  },
  actions: {
    async getCategoryList() {
      try {
          await axios({
            method: 'get',
            url:'http://localhost:3001/api/category/all',
          }).then( response => {
            const rd = response.data;
            if (response.data.error) {
              return response.data.error
            }
            else {
              console.log(response.data.categories)
              this.categories = response.data.categories
              return
            }
          })
      }
      catch (err) {
        console.log(err)
      }
    },
    async getConditionList() {
      try {
          await axios({
            method: 'get',
            url:'http://localhost:3001/api/condition/all',
          }).then( response => {
            const rd = response.data;
            if (response.data.error) {
              return response.data.error
            }
            else {
              console.log(response.data.conditions)
              this.conditions = response.data.conditions
              return
            }
          })
      }
      catch (err) {
        console.log(err)
      }
    },
  },
  persist: {
    enabled: true
  }
})
  