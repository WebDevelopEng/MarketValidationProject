import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
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
import { cn } from "@/lib/utils"

// ListItem component for dropdown items - Dark theme (MOVED TO TOP)
const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors text-white hover:bg-gray-700 focus:bg-gray-700",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-300">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default function LandingPage(){
    return(
        <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <NavBar/>
        <div className="flex mt-10 h-[470px] w-[80%] ml-auto mr-auto">
        <div className="w-1/2 h-full"><CardCarousel/></div>
        <div className="w-1/2 h-full"><TextBox className="inter-200"/></div>
        </div>
        <div className="w-[80%] mr-auto ml-auto mt-[5%] mb-[5%]">
          <h1 className="font-extrabold text-balance text-3xl mb-[2%] text-white">Popular Products</h1>
          <ProductCarousel/>
        </div>
        <Footer/>
        </div>
    );
}

export function NavBar() {
  return (
    <div className='border-b-2 border-b-gray-700 pb-2 bg-gray-900'>
      <div className="flex w-full items-center max-w-7xl mx-auto px-4">
        {/* Left side navigation */}
        <div className="flex items-center flex-1">
          <div className="pr-8 text-3xl">
            <h1 className="font-extrabold text-balance text-white">Desinar</h1>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList className="flex gap-2">
              {/* Landing Page - Fixed color */}
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="/" 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-white bg-transparent hover:bg-gray-100"
                  )}
                >
                  Landing Page
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Products Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white bg-transparent hover:bg-gray-800 data-[state=open]:bg-gray-800">
                  <a href ="/products">Products</a>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-gray-800 border border-gray-700">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/products/website-templates" title="Website Templates" className="hover:bg-gray-700">
                      High-quality, customizable website templates
                    </ListItem>
                    <ListItem href="/products/custom-design" title="Custom Design" className="hover:bg-gray-700">
                      Affordable custom design services
                    </ListItem>
                    <ListItem href="/products/company-profile" title="Company Profile" className="hover:bg-gray-700">
                      Professional company profile designs
                    </ListItem>
                    <ListItem href="/products/professional-design" title="Professional Design" className="hover:bg-gray-700">
                      Tailored design solutions for businesses
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Designers Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white bg-transparent hover:bg-gray-800 data-[state=open]:bg-gray-800">
                  <a href="/designers">Designers</a>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-gray-800 border border-gray-700">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/designers?specialty=ui-ux" title="UI/UX Design" className="hover:bg-gray-700">
                      Interface and experience design
                    </ListItem>
                    <ListItem href="/designers?specialty=product" title="Product Design" className="hover:bg-gray-700">
                      Digital products and SaaS
                    </ListItem>
                    <ListItem href="/designers?specialty=brand" title="Brand Identity" className="hover:bg-gray-700">
                      Logos and brand systems
                    </ListItem>
                    <ListItem href="/designers?specialty=web" title="Web Design" className="hover:bg-gray-700">
                      Websites and landing pages
                    </ListItem>
                    <ListItem href="/designers?specialty=motion" title="Motion Design" className="hover:bg-gray-700">
                      Animations and interactions
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Assets Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white bg-transparent hover:bg-gray-800 data-[state=open]:bg-gray-800">
                  <a href="/assets">Assets</a>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-gray-800 border border-gray-700">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/assets?category=ui-kits" title="UI Kits" className="hover:bg-gray-700">
                      Complete design systems and components
                    </ListItem>
                    <ListItem href="/assets?category=icons" title="Icons" className="hover:bg-gray-700">
                      Professional icon packs in multiple formats
                    </ListItem>
                    <ListItem href="/assets?category=fonts" title="Fonts" className="hover:bg-gray-700">
                      Licensed font families for commercial use
                    </ListItem>
                    <ListItem href="/assets?category=illustrations" title="Illustrations" className="hover:bg-gray-700">
                      Custom illustrations and vector art
                    </ListItem>
                    <ListItem href="/assets?category=mockups" title="Mockups" className="hover:bg-gray-700">
                      Professional device and presentation mockups
                    </ListItem>
                    <ListItem href="/assets?category=textures" title="Textures" className="hover:bg-gray-700">
                      Backgrounds and pattern resources
                    </ListItem>
                    <ListItem href="/assets?category=3d" title="3D Assets" className="hover:bg-gray-700">
                      3D models and abstract shapes
                    </ListItem>
                    <ListItem href="/assets?category=photos" title="Photography" className="hover:bg-gray-700">
                      High-quality stock photographs
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side - Account & Login */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-2">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white bg-transparent hover:bg-gray-800 data-[state=open]:bg-gray-800">
                Account
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-gray-800 border border-gray-700">
                <ul className="grid w-[200px] gap-2 p-4">
                  <ListItem href="/account/profile" title="Profile" className="hover:bg-gray-700">
                    Manage your account
                  </ListItem>
                  <ListItem href="/account/orders" title="Orders" className="hover:bg-gray-700">
                    View your purchases
                  </ListItem>
                  <ListItem href="/account/settings" title="Settings" className="hover:bg-gray-700">
                    Account preferences
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink 
                href="/login"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "text-white bg-transparent hover:bg-gray-800"
                )}
              >
                Login
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}


function CardCarousel(){
  return (
  <div className="h-full">
    <Carousel className="h-full">
      <CarouselContent className="h-full">
        <CarouselItem className="w-full h-full">
          <img 
            src="/StaticImages/LandingPageImage.jpg" 
            className="w-full h-full object-cover "
            alt="Landing Page"
          />
        </CarouselItem>
        <CarouselItem className="w-full h-full">
          <img 
            src="/StaticImages/webdesign2.jpeg" 
            className="w-full h-full object-cover"
            alt="Placeholder 1"
          />
        </CarouselItem>
        <CarouselItem className="w-full h-full">
          <img 
            src="/StaticImages/WebDesign3.png" 
            className="w-full h-full object-cover rounded-lg"
            alt="Placeholder 2"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="!left-2 bg-gray-800 text-white hover:bg-gray-700 border-0" />
      <CarouselNext className="!right-2 bg-gray-800 text-white hover:bg-gray-700 border-0" />
    </Carousel>
  </div>)
}

function TextBox(prop){
  const classnames = prop.className;
  return(
    <div>
        <Card className={`h-[470px] text-center rounded-lg border border-gray-700 bg-gray-800 ${classnames}`}>
            <CardHeader>
              <CardTitle>
                <h1 className="text-3xl font-bold text-white">Desinar</h1>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-lg text-gray-300">
                Here in Desinar, we have the best web designers there are. 
                We provide high-quality design services, templates, and assets 
                to help bring your vision to life.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-center gap-2 text-gray-300">
                  <span className="text-green-500"></span>
                  <span>Professional Designers</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-300">
                  <span className="text-green-500"></span>
                  <span>Custom Solutions</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-300">
                  <span className="text-green-500"></span>
                  <span>Fast Delivery</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pt-6">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </CardFooter>
        </Card>
    </div>
  )
}

function ProductCarousel(){
  const products = [
    {
      title: "Marketplace Minimalist Design",
      description: "An ecommerce website with clean, modern design.",
      image: "/StaticImages/ECommerce.jpg"
    },
    {
      title: "Personal Portfolio Design",
      description: "A website most suited for stylizing a personal website.",
      image: "/StaticImages/PortfolioSite.png"
    },
    {
      title: "Promotional Design",
      description: "A website most suited for promotional campaigns.",
      image: "/StaticImages/PromotionalSite.jpg"
    },
    {
      title: "Corporate Business Design",
      description: "Professional design for corporate businesses.",
      image: "/StaticImages/CorporateSite.png"
    }
  ]

  return(
    <Carousel className="ml-auto mr-auto w-full">
      <CarouselContent>
        <CarouselItem className="flex gap-6">
          {products.map((product, index) => (
            <Card key={index} className="w-1/4 flex-shrink-0 border border-gray-700 bg-gray-800">
              <CardHeader className="pb-4">
                <div className="aspect-video overflow-hidden rounded-lg mb-4">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-lg text-white">{product.title}</CardTitle>
                <CardDescription className="mt-2 text-gray-300">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </CardFooter>
            </Card>
          ))}
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="!left-2 bg-gray-800 text-white hover:bg-gray-700 border-0" />
      <CarouselNext className="!right-2 bg-gray-800 text-white hover:bg-gray-700 border-0" />
    </Carousel>
  )
}

export function Footer(){
  return(
    <div className="mt-auto">
      <div className="flex bg-gray-900 p-8 border-t border-gray-700">
        <div className="flex flex-col w-1/3">
          <div className="flex ml-auto mr-auto items-center">
            <img 
              className="h-[100px] w-[100px] rounded-lg" 
              src="/StaticImages/dLogo.jpg" 
              alt="Desinar Logo"
            />
          </div>
        </div>
        
        <div className='flex flex-col w-1/3 text-center text-white font-sans'>
          <div className="font-bold text-lg mb-4">Links</div>
          <div className="inter-400 mb-2 hover:text-gray-300 cursor-pointer text-gray-400">
            Customer Service
          </div>
          <div className="inter-400 mb-2 hover:text-gray-300 cursor-pointer text-gray-400">
            Our Team
          </div>
          <div className="inter-400 mb-2 hover:text-gray-300 cursor-pointer text-gray-400">
            About Us
          </div>
        </div>
        
        <div className='flex flex-col w-1/3 text-center text-white font-sans'>
          <div className="font-bold text-lg mb-4">Support</div>
          <div className="inter-400 space-y-2 text-gray-400">
            <div>Telephone: +62 123 456 789</div>
            <div>Email: support@desinar.com</div>
            <div>Address: Jakarta, Indonesia</div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 text-white text-center py-4 border-t border-gray-700">
        <p className="text-gray-400">&copy; 2024 Desinar. All rights reserved.</p>
      </div>
    </div>
  )
}