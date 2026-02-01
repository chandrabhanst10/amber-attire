import { createApi } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import axiosInstance from '../lib/axios';
import { IProduct, CartItem, User } from '../types/types';

const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: '' }
    ): BaseQueryFn<
        {
            url: string;
            method?: AxiosRequestConfig['method'];
            data?: AxiosRequestConfig['data'];
            params?: AxiosRequestConfig['params'];
            headers?: AxiosRequestConfig['headers'];
        },
        unknown,
        unknown
    > =>
        async ({ url, method, data, params, headers }) => {
            try {
                const result = await axiosInstance({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers,
                });
                return { data: result.data };
            } catch (axiosError) {
                const err = axiosError as AxiosError;
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                };
            }
        };

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ baseUrl: '' }), // baseUrl handled by axiosInstance
    tagTypes: ['IProduct', 'Cart', 'User'],
    endpoints: (builder) => ({
        // Auth endpoints
        login: builder.mutation<{ user: User; accessToken: string; message?: string }, any>({
            query: (credentials) => ({
                url: '/api/auth/login',
                method: 'POST',
                data: credentials,
            }),
            invalidatesTags: ['User', 'Cart'],
        }),
        register: builder.mutation<any, any>({
            query: (data) => ({
                url: '/api/auth/register',
                method: 'POST',
                data: data,
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/api/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['User', 'Cart'],
        }),

        // User endpoints
        getProfile: builder.query<User, void>({
            query: () => ({ url: '/api/auth/profile', method: 'GET' }),
            providesTags: ['User'],
        }),

        // IProduct endpoints
        getIProducts: builder.query<{ data: IProduct[]; total: number, pagination: any }, string>({
            query: (queryStr = '') => ({
                url: `/api/products?${queryStr}`,
                method: 'GET',
            }),
            providesTags: (result) =>
                result && result.data
                    ? [
                        ...result.data.map(({ _id }) => ({ type: 'IProduct' as const, id: _id })),
                        { type: 'IProduct', id: 'LIST' },
                    ]
                    : [{ type: 'IProduct', id: 'LIST' }],
        }),
        getTaggedIProducts: builder.query<{ success: boolean; data: IProduct[] }, string>({
            query: (tag) => ({
                url: `/api/products/tags`,
                params: { tag },
                method: 'GET'
            }),
            providesTags: (result) =>
                result && result.data
                    ? [
                        ...result.data.map(({ _id }) => ({ type: 'IProduct' as const, id: _id })),
                        { type: 'IProduct', id: 'TAGGED' }
                    ]
                    : [{ type: 'IProduct', id: 'TAGGED' }]
        }),
        getIProduct: builder.query<{ data: IProduct }, string>({
            query: (id) => ({
                url: `/api/products/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'IProduct', id }],
        }),

        // Cart endpoints
        getCart: builder.query<{ cart: CartItem[], subTotal: number, grandTotal: number }, void>({
            query: () => ({ url: '/api/cart/view', method: 'GET' }),
            providesTags: ['Cart'],
        }),
        addToCart: builder.mutation<any, { productId: string; quantity: number, variantId?: string }>({
            query: (body) => ({
                url: '/api/cart/add',
                method: 'POST',
                data: body,
            }),
            invalidatesTags: ['Cart'],
        }),
        removeFromCart: builder.mutation<any, string>({
            query: (productId) => ({
                url: `/api/cart/remove/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),
        updateCartItem: builder.mutation<any, { productId: string; quantity: number }>({
            query: (body) => ({
                url: '/api/cart/update',
                method: 'PUT',
                data: body,
            }),
            invalidatesTags: ['Cart'],
        }),
        clearCart: builder.mutation<any, void>({
            query: () => ({
                url: '/api/cart/clear',
                method: 'DELETE'
            }),
            invalidatesTags: ['Cart']
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGetProfileQuery,
    useGetIProductsQuery,
    useGetTaggedIProductsQuery,
    useGetIProductQuery,
    useGetCartQuery,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useUpdateCartItemMutation,
    useClearCartMutation,
} = apiSlice;
