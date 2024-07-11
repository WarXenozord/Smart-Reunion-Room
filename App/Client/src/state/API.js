import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: [
        "User",
        "Users",
        "Rooms",
        "Bookings",
        "book",
        "RoomUses",
        "Transactions",
        "Sales",
        "Admins",
        "Performance",
        "Dashboard",
    ],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getUsers: build.query({
            query: () => "management/users",
            providesTags: ["Users"],
        }),
        getRooms: build.query({
            query: () => "management/rooms",
            providesTags: ["Rooms"],
        }),
        getRoomUses: build.query({
            query: () => "management/roomUses",
            providesTags: ["RoomUses"],
        }),
        getBookings: build.query({
            query: ( rooms/*page, pageSize, sort, search*/ ) => ({
                url: "general/bookings",
                method: "GET",
                params: { rooms },
            }),
            providesTags: ["Bookings"],
        }),
        postBook: build.mutation({
            query: ({ startTime, finishTime, room, name, userId, allDay }) => ({
                url: "general/book",
                method: "POST",
                body: { startTime, finishTime, room, name, userId,allDay },
            }),
            providesTags: ["Book"],
        }),
        deleteBook: build.mutation({
            query: (id) => ({
                url: `general/book/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Book"],
        }),
        getAdmins: build.query({
            query: () => "management/admins",
            providesTags: ["Admins"],
        }),
        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ["Performance"],
        }),
        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTags: ["Dashboard"],
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetUsersQuery,
    useGetRoomsQuery,
    useGetRoomUsesQuery,
    useGetBookingsQuery,
    useGetAdminsQuery,
    useGetUserPerformanceQuery,
    useGetDashboardQuery,
    usePostBookMutation,
    useDeleteBookMutation,
} = api;