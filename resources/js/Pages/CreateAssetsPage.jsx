import React from 'react'
import { NavBar, Footer } from './LandingPage'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@heroui/button"
import{

    
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,

} from "@/components/ui/select"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Textarea} from "@/components/ui/textarea"
import { Form } from '@inertiajs/react'
import {useState} from 'react'
import { addPointerInfo } from 'framer-motion'
import { Files } from 'lucide-react'
import Input from "@/components/ui/input"

export default function CreateAssetsPage(props){
    const [nooffiles,setnooffiles]=useState(0)
    const [fileinputs, setfileinputs] = useState([])
    const [previews,setpreviews]=useState([])
    const [noofimages,setnoofimages]=useState(0)
    const [imageinputs,setimginputs]=useState([])
    const [imgpreviews,setimgpreviews]=useState([])
    var Files=[]
    console.log(props.errors);
    for (var i=0;i<fileinputs.length;i++){
        Files.push(fileinputs[i])
    }
    function AddFileNumber(){
        setnooffiles(nooffiles+1)
        Files.push(
    <div className="relative">
        <div className="Inter-200 ml-[10px] ">File {nooffiles+1}</div>
      <Input type="file" className="border-0"
        name={`files[${nooffiles}]`}
        onChange={FilePreview}>
    </Input>

    </div>
    );
     setfileinputs(Files)
    }
    var imageinputss=[]
    function AddImageNumber(){
        for(var i=0;i<imageinputs.length;i++){
            imageinputss.push(imageinputs[i])
        }
        setnoofimages(noofimages+1)
        imageinputss.push(
            <div className="relative">
                <div className="Inter-200 ml-[10px] ">Image {noofimages+1}</div>
                <Input type="file" className="border-0"
                    name={`images[${noofimages}]`}
                    onChange={ImagePreview}>
                </Input>
            </div>
        );
        setimginputs(imageinputss)
    }

    function ImagePreview(e){
        var currentfile=e.target.files[0]
        var filename=currentfile.name
        var filetype=currentfile.type
        var imgpreviewss=[]
        const reader = new FileReader();

        reader.addEventListener("load",()=>{
            var fileurl=reader.result
            for(var i=0;i<imgpreviews.length;i++){
            imgpreviewss.push(
                previews[i]
            )
            
            }
            if(filetype.startsWith("image/")){
                imgpreviewss.push(
                <div className="text-white border-2 border-gray-700 h-[500px] w-[80%] ml-auto mr-auto">
                
                <div className="Inter-200 ml-[10px] mb-[20px]"><b>Image {i+1}</b><br>
                </br><b>{filename}</b></div>
                
                <img className="contain w-[80%] h-[80%] ml-auto mr-auto pb-10" src={fileurl} ></img>
                </div>
                )
            }
            setimgpreviews(imgpreviewss);
        })
        reader.readAsDataURL(currentfile)
    }
    function FilePreview(e){
        var currentfile=e.target.files[0]
        var filename=currentfile.name
        var filetype=currentfile.type
        var newpreviews=[]
        const reader = new FileReader();

        reader.addEventListener("load",()=>{
            var fileurl=reader.result
            for(var i=0;i<previews.length;i++){
            newpreviews.push(
                previews[i]
            )
        }
            console.log(filename)
             if (filetype=="text/html"){
            newpreviews.push(
                <div className="text-white border-2 border-gray-70 ml-auto mr-auto w-[80%] h-[700px]">
                <div className="Inter-200 ml-[10px] mb-[20px]"><b>File {i+1}</b><br>
                </br><b>{filename}</b></div>
                <div key={filename} className="w-[80%] h-[500px] mx-auto border border-gray-700">
                    <iframe
                        src={fileurl}
                        className="w-full h-full"
                        style={{ border: 'none' }}
                    ></iframe>
                </div>
                </div>
            )
        }
            if(filetype.startsWith("image/")){
                newpreviews.push(
                <div className="text-white border-2 border-gray-700 h-[500px] w-[80%] ml-auto mr-auto">
                
                <div className="Inter-200 ml-[10px] mb-[20px]"><b>File {i+1}</b><br>
                </br><b>{filename}</b></div>
                
                <img className="contain w-[80%] h-[80%] ml-auto mr-auto pb-10" src={fileurl} ></img>
                </div>
                )
            }
            setpreviews(newpreviews)
        }
        )
        reader.readAsDataURL(currentfile);
        
       

    }
    
    return(
        <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
                <NavBar/>
                <div className="w-full">
                    <div className="rounded-none flex justify-center mt-[3%] mb-[3%] ">
                    <ScrollArea className="w-[40%] h-[900px] relative">
                    <div className="w-[100%] rounded-none bg-gray-800 border-b-2 border-gray-700 min-h-[900px] ">
                        <h1 className="text-4xl font-extrabold text-white ml-auto mr-auto w-fit pt-5">Asset Preview</h1>
                        <div>
                        <div className="w-[80%] ml-auto mr-auto"><h5 className="text-xl text-white w-fit pt-5">File Previews:</h5><br></br></div>
                        {previews}
                        </div>
                        <div>
                        <div className="w-[80%] ml-auto mr-auto"><h5 className="text-xl text-white w-fit pt-5">Image Previews:</h5><br></br></div>
                        {imgpreviews}
                        </div>
                    </div>
                    </ScrollArea>
                    <ScrollArea className="w-[40%] h-[900px] relative">
                    <div>
                    <div className="w-[100%] rounded-none text-white bg-gray-800 border-b-2 border-gray-700 pt-5 pb-30 min-h-[900px]">
                        <div className="flex-col text-center ">
                            <h1 className="text-4xl font-extrabold ">Create an Asset</h1>
                            <div className="mt-[10%]">   
                                <Form action="/account/assets/create" method="POST" enctype="multipart/form-data">
                                <div className="flex flex-col w-[80%] mr-auto ml-auto text-left gap-5">
                                    {props.errors && Object.keys(props.errors).length > 0 && (
                                        <div className="bg-red-600 text-white p-2 mb-4 rounded">
                                            <ul>
                                            {Object.values(props.errors).map((err, idx) => (
                                                <li key={idx}>{err}</li>
                                            ))}
                                            </ul>
                                        </div>
                                        )}
                                    <div className="Inter-200 ml-[10px]"><div>Asset Name </div>
                                    <Input type="name" placeholder="Enter Asset Name" id="name" name="name">
                                    </Input>
                                    </div>
                                    <div className="Inter-200 ml-[10px]"><div>Asset Description</div> 
                                    <Textarea placeholder="Enter Asset Description..." id="description" name="description">
                                    </Textarea>
                                    </div>
                                    <div className="Inter-200 ml-[10px]"><div>Asset Price</div> 
                                    <div className="inline-block border-double">Rp.</div>
                                    <Input type="numeric" placeholder="Enter asset price" id="price" name="price">
                                    </Input>
                                    </div>
                                    <div className="Inter-200 ml-[10px]"><div>Asset Type</div>
                                    <Select id="category" name="category" >
                                        <SelectTrigger>
                                        <SelectValue placeholder="Select a category:"></SelectValue>
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-800 text-white">
                                        
                                            <SelectItem value='UI Kits'>UI Kits
                                            </SelectItem>
                                            <SelectItem value='Icons'>Icons</SelectItem>
                                            <SelectItem value='Illustrations'>Illustrations</SelectItem>
                                            <SelectItem value='Fonts'>Fonts</SelectItem>
                                            <SelectItem value='Mockups'>Mockups</SelectItem>
                                            <SelectItem value='3D Assets'>3D Assets</SelectItem>
                                            <SelectItem value='Photography'>Photography</SelectItem>
                                        
                                        </SelectContent>
                                    </Select>
                                    </div>
                                    <div className="Inter-200 ml-[10px]"><div>Format
                                    </div>
                                    <Input type="text" placeholder="Enter used formats" id='format' name="format"></Input>
                                    <div>License:</div>
                                    <Select id="license" name="license" >
                                        <SelectTrigger>
                                        <SelectValue placeholder="Select a license:"></SelectValue>
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-800 text-white">
                                        
                                            <SelectItem value='MIT License'>MIT License
                                            </SelectItem>
                                            <SelectItem value='GNU General Public License (GPL)'>GNU General Public License (GPL)</SelectItem>
                                            <SelectItem value='Apache License 2.0'>Apache License 2.0</SelectItem>
                                            <SelectItem value='BSD Licenses'>BSD Licenses</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div>Size:</div>
                                    <Input type="text" placeholder="Input Size" id='size'name="size"></Input>
                                    <div> Tags: </div>
                                    <Input type="text" placeholder="Input tags" id="tags" name="tags"></Input>
                                    <Button type="button" onPress={AddFileNumber} >
                                        Add new file +
                                    </Button> 
                                    <div className="border-2 border-white-700 rounded-xl">
                                    {fileinputs}
                                    </div>
                                    <Button type="button" onPress={AddImageNumber}>
                                        Add display images +
                                    </Button>
                                    <div className="border-2 border-white-700 rounded-xl">
                                    {imageinputs}
                                    </div>
                                    <div></div><div></div><div></div></div>
                                    <div className="ml-[10px]">
                                        <Button color='primary' type="submit" className="w-full rounded"> 
                                        Create Asset
                                    </Button>
                                    </div>

                                
                                    
                                </div>
                               
                                </Form>


                            </div>

                        </div>
                    </div>
                    </div>
                    </ScrollArea>
                 
                    </div>
                </div>
                <Footer/>
                </div>


    )


}