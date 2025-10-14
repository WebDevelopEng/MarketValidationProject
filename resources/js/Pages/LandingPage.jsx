import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function LandingPage(){
    return(
        <div className="w-full flex flex-col min-h-screen ">
        <div className='border-b-2 border-b-gray-200 pb-2'>
        <NavBar/>
        </div>
        <div className="flex mt-10 h-[470px] w-[80%] ml-auto mr-auto">
        <div className="w-1/2 h-full"><CardCarousel/></div>
        <div className="w-1/2 h-full"><TextBox className="inter-200"/></div>
        
        </div>
        <div className="w-[80%] mr-auto ml-auto mt-[5%] mb-[5%]">
          <h1 className="font-extrabold text-balance text-3xl mb-[2%]">Popular Products</h1>
          <ProductCarousel/></div>
        <Footer/>
        </div>
    );
}

export function NavBar() {
  return (
    <div className="flex w-full">
    <NavigationMenu >
      <NavigationMenuList className="flex !w-full" style={{ width: '100%' }}>
        <NavigationMenuItem>
            <div className="pl-8 pr-8 text-3xl">
            <h1 className="font-extrabold text-balance ">Desinar</h1>
            </div>
        </NavigationMenuItem>
        <NavigationMenuItem className={navigationMenuTriggerStyle()}>
          <span className="leading-7 [&:not(:first-child)]:mt-6"><a href="/">Landing Page</a></span>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild >
            
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger> <span className="leading-7 [&:not(:first-child)]:mt-6">Sales</span></NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                 
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                 
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger><span className="leading-7 [&:not(:first-child)]:mt-6">Designers</span></NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                 
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger><span className="leading-7 [&:not(:first-child)]:mt-6">Assets</span></NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
       
      </NavigationMenuList>
      
    </NavigationMenu>
    <NavigationMenu className="ml-auto">
        <NavigationMenuList>
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
                Account
            </NavigationMenuItem>
         <NavigationMenuItem className="ml-auto">
            <div className={navigationMenuTriggerStyle()}>
                <a href ="/login">Login</a>
            </div>
      </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
    </div>
  )
}
function CardCarousel(){
  return (
  <div className="h-full">
  
  <Carousel className="h-full">
    <CarouselContent className="h-full">
      <CarouselItem className="w-full h-full">
        <img src = "/Staticimages/LandingPageImage.jpg" className="w-full h-full" style={{"object-fit":"fill"}}></img>
      </CarouselItem>
      <CarouselItem>
         <img src="/Staticimages/Placeholder.png"></img>
      </CarouselItem>
      <CarouselItem>
           <img src="/Staticimages/Placeholder.png"></img>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious className="!left-2" ></CarouselPrevious>
    <CarouselNext className="!right-2 " ></CarouselNext>
  </Carousel>
  </div>)
}

function TextBox(prop){
  var classnames=prop.className;
  return(
    
    <div>
        <Card className ={`h-[470px] text-center rounded-none ${classnames}`}>
            <CardHeader><CardTitle><h1>Desinar</h1></CardTitle></CardHeader>
            <CardContent>
              Here in Desinar, we have the best web designers there are. 
            </CardContent>
        </Card>
    </div>


  )



}

function ProductCarousel(){
  return(<Carousel className="ml-auto mr-auto w-[95%]">
    <CarouselItem className="flex gap-30">
      <Card className="w-1/5">
        <CardHeader>
          <img src="StaticImages/Placeholder.png" className='mb-[10%]'></img>
            
            <CardTitle>
                Marketplace Minimalist Design
            </CardTitle>
            <CardDescription>
          An ecommerce website. 
      </CardDescription>
        </CardHeader>
      
      </Card>
      <Card className="w-1/5">
        <CardHeader>
          <img src="StaticImages/Placeholder.png" className='mb-[10%]'></img>
            
          <CardTitle>
            Personal Portfolio Design
          </CardTitle>
          <CardDescription>
          A website most suited for stylizing a personal website. 
        </CardDescription>
        </CardHeader>
        
      </Card>
      <Card className="w-1/5">
        <CardHeader>
          <img src="StaticImages/Placeholder.png" className='mb-[10%]'></img>
            
          <CardTitle>
            Promotional Design
          </CardTitle>
        <CardDescription>
          A website most suited for promotional campaigns.
        </CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-1/5">
        <CardHeader>
            <img src="StaticImages/Placeholder.png" className='mb-[10%]'></img>
            
          
          <CardTitle>
            Promotional Design
          </CardTitle>
        <CardDescription>
          A website most suited for promotional campaigns. 


        </CardDescription>
        </CardHeader>
      </Card>
    </CarouselItem>
    <CarouselPrevious className="!left-2" ></CarouselPrevious>
    <CarouselNext className="!right-2 " ></CarouselNext>
  </Carousel>)
}
export function Footer(){
  return(
    <div className="h-1/5 mt-auto">
      <div className="flex bg-[#636363]">
        <div className="flex flex-col w-1/3">
            <div className="flex ml-auto mr-auto items-center">
            
            <img className=" h-[100px] w-[100px]" src="/StaticImages/dLogo.jpg"></img> 
            </div>


        </div>
        <div className='flex flex-col w-1/3 text-center text-white font-sans font-bold'>
          <div className="">Links</div>
          <div className="inter-400">
            Customer Service
          </div>
          <div className="inter-400">
            Our Team
          </div>

        </div>
        <div className='flex flex-col w-1/3 text-center text-white font-sans font-bold'>
          <div>Support</div>
          <div className="inter-400">
          <div>Telephone: +62123456789</div>
          <div>Email: abc@yahoo.com</div>
          </div>


        </div>
        </div>
    </div>
  )
}