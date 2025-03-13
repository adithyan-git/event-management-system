import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:'mySlice',
    initialState:{
        ProfileDetails:[],
        loginDetails:[],
        allUserEvents:[],
        allUsers:[],
        editingUserValue:[],
        addedEvents:[],
        eventValue:[]
    },
    reducers:{
        sendProfileDetails:(state,action)=>{
            state.ProfileDetails =  action.payload;
        },
        emptyProfile:(state,action)=>{
            state.ProfileDetails =  action.payload;
            state.addedEvents = action.payload
            state.loginDetails = action.payload
        },
        sendLoginDetails:(state,action)=>{
            state.loginDetails =  action.payload;
        },
        sendProfileUpdatedDetails:(state,action)=>{
            const profileData = JSON.parse(JSON.stringify(state.ProfileDetails));
            profileData.fullname = action.payload.fullname
            profileData.email = action.payload.email
            profileData.place = action.payload.place
        },
        sendProfileUpdatedImage:(state,action)=>{
            const profileData = JSON.parse(JSON.stringify(state.ProfileDetails));
            profileData.profileImage = action.payload.profileImage
        },
        sendUserAllEvents:(state,action) => {
            state.allUserEvents = action.payload;
        },
        sendAllUser:(state,action) => {
            state.allUsers = action.payload;
        },
        deletedUser:(state,action)=>{
            const allUsers = JSON.parse(JSON.stringify(state.allUsers))
            const index = allUsers.findIndex((user)=>user._id === action.payload)
            state.allUsers.splice(index,1)
        },
        sendEditingUserValue:(state,action)=>{
            state.editingUserValue = action.payload
        },
        sendEditedUserDetails:(state,action)=>{
            const allUsers = JSON.parse(JSON.stringify(state.allUsers))
            const index = allUsers.findIndex((user)=>user._id === action.payload.id)
            state.allUsers[index].role = action.payload.role
            state.allUsers[index].status = action.payload.status

        },
        sendAddedEvents:(state,action)=>{
            state.addedEvents = action.payload
        },
        deleteEvents:(state,action)=>{
            const addedEvents = JSON.parse(JSON.stringify(state.addedEvents));
            const index = addedEvents.findIndex((event)=>event._id === action.payload);
            state.addedEvents.splice(index,1)
        },
        editingEventDetails:(state,action) =>{
            state.eventValue = action.payload
        },
        updateEvent:(state,action)=>{
            const addedEvents = JSON.parse(JSON.stringify(state.addedEvents));
            const index = addedEvents.findIndex((event)=>event._id === action.payload.id);
            state.addedEvents[index].title = action.payload.title
            state.addedEvents[index].description = action.payload.description
            state.addedEvents[index].location = action.payload.location
            state.addedEvents[index].date = action.payload.date
            state.addedEvents[index].time = action.payload.time

        }


    }
})

export const {sendProfileDetails,emptyProfile,sendLoginDetails,sendProfileUpdatedDetails,sendProfileUpdatedImage,
    sendUserAllEvents,sendAllUser,deletedUser,sendEditingUserValue,sendEditedUserDetails,sendAddedEvents,deleteEvents,editingEventDetails,updateEvent} = slice.actions
export default slice.reducer