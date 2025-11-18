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
import { Form } from '@inertiajs/react'
import Input from "@/components/ui/input"
import { Button } from '@heroui/button'
export default function RegistrationPage(){
    return(
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800">
            <NavBar></NavBar>

                <RegistrationForm></RegistrationForm>

            <Footer></Footer>
        </div>
    )
}

function RegistrationForm(){
    return(
        
        <div className="w-full h-[80vh] mb-8 ">
            <Form action="/register" method="post" className="h-full">
                <div className="relative w-[60%] h-full flex flex-col ml-auto mr-auto mt-[20px] Inter-200 rounded-none text-white bg-gray-800 border-b-2 border-gray-700">
                    <div className="overflow-hidden relative h-[20%] w-full" >
                        <img src="StaticImages/RegistrationImage.jpg" className="blur-xs absolute w-full h-auto"></img>
                    </div>
                <Card className="w-full rounded-none text-white bg-gray-800 border-b-2 border-gray-700 h-full">
                    <CardTitle className="text-4xl font-extrabold ml-auto mr-auto">Register an Account</CardTitle>
                    <div className="w-[70%] ml-auto mr-auto">
                    <div className="ml-auto mr-auto w-full flex flex-col gap-5">
                    <div className="flex flex-row w-full gap-5 justify-between ">
                        <div className="w-[45%]">
                        First Name:
                        <Input type="text" name="firstname"></Input>
                        </div>
                        <div className="w-[45%]">
                        Last Name:
                        <Input type="text" name="lastname"></Input>
                        </div>
                    </div>
                        <div>
                        Enter Email:
                        <Input type="email" name="email"></Input>
                        </div>
                        <div>
                        Enter Password:
                        <Input type="password" name="password"></Input>
                        </div>
                        <div>
                        Enter Phone Number:
                        <Input type="text" name="phonenumber"></Input>
                        </div><br></br>
                        <Button color="primary" type="submit"> Register</Button>
                        <div className="flex flex-row justify-between">
                            <a href="/login" className="text-muted-foreground">Return to Login Page</a>
                            <a href="/forgot" className="text-muted-foreground">Forgot your password?</a>

                        </div>
                    </div>
                    </div>
                </Card>
                </div>
            </Form>
        </div>




 

    )



}