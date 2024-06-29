import mongoose from "mongoose";

    export const connectdb=()=>{
        mongoose.connect("mongodb+srv://ashutoshbtech2002:<password>@cluster0.uskgvu1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
            console.log("Db is connected");
        }).catch((err)=>console.log(err))
    }