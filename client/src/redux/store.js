import {configureStore,combineReducers} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import themeReducer from './theme/themeSlice'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'

const rootReducer=combineReducers({
    user:userReducer,
    theme:themeReducer
})
const persistConfig={
    key:'root',
    storage,
    version:1
}

const persistreducer=persistReducer(persistConfig,rootReducer)

export const store=configureStore(
    {
        reducer:persistreducer,
        //we use a middleware
        middleware:(getDefaultMiddleware)=>
            getDefaultMiddleware({serializableCheck:false})
    }
)

export const persitStor=persistStore(store)