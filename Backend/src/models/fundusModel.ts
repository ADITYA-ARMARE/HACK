import {Schema,model} from "mongoose";


interface post{
    imageUrl:string;
}

const postSchema = new Schema<post>({
    imageUrl:{type:String,required:true,unique:true}
})

const fundusmodel = model("post",postSchema);

export default fundusmodel;





