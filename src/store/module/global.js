/**
 * Created by lhzbxx on 2016/11/5.
 *
 * global.js
 * 管理全局的状态
 */

import * as types from '../mutation-types'
import data from '../../api/data'

const state = {
    region: 1,
    needLogin: 0
}

const mutations = {
    [types.CHANGE_REGION] (state, regionIndex) {
        if (!Number.isInteger(regionIndex)) {
            for (let i of data.regions) {
                if (i.code == regionIndex)
                    state.region = data.regions.indexOf(i)
            }
        } else {
            state.region = regionIndex
        }
    },
    [types.REQUIRE_LOGIN] (state) {
        state.needLogin += 1
    }
}

export default {
    state,
    mutations
}
