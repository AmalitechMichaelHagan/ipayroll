import {createSlice} from "@reduxjs/toolkit";

const user = createSlice({
name: "user",
initialState:{
    firstname: "skip",
    isAdmin: false,
    id:1,
    department:"",
    rank:"",
    taxRelief:false,
    pendingLoan:false
},
reducers: {
setUser: (state,action) =>{
const {firstname, isAdmin,id,department,rank,taxRelief,pendingLoan} = action.payload;
state.firstname = firstname;
state.isAdmin = isAdmin;
state.id = id;
state.department = department;
state.rank = rank;
state.taxRelief = taxRelief;
state.pendingLoan = pendingLoan;
}

}


});

export const {setUser} = user.actions;
export default user;