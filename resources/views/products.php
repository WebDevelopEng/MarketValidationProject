<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login Page</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="flex flex-col min-h-screen">

  <!-- Navbar -->
  <header class="border-b-2 border-gray-200 pb-2">
    <nav class="flex items-center justify-between px-8 py-4">
      <div class="text-2xl font-bold">MyWebsite</div>
      <ul class="flex space-x-6 text-gray-600">
        <li><a href="/" class="hover:text-blue-600">Home</a></li>
        <li><a href="/about" class="hover:text-blue-600">About</a></li>
        <li><a href="/contact" class="hover:text-blue-600">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- Login Form Section -->
  <main class="flex justify-center flex-grow mt-8 mb-8">
    <div class="flex w-[80%] max-w-5xl justify-between gap-6">

      <!-- Left Card (Image) -->
      <div class="w-1/2 border p-6 flex items-center justify-center">
        <img src="/StaticImages/Placeholder.png" alt="Placeholder" class="max-h-80 object-contain" />
      </div>

      <!-- Right Card (Form) -->
      <div class="w-1/2 border p-10 flex flex-col items-center text-center">
        <h1 class="text-4xl font-extrabold mb-10">Login</h1>
        <form action="/login" method="POST" enctype="multipart/form-data" class="w-4/5 text-left space-y-5">
          
          <div>
            <label for="email" class="block mb-2 font-medium">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your Email"
                   class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
          </div>

          <div>
            <label for="password" class="block mb-2 font-medium">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your Password"
                   class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
          </div>

          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Login
          </button>

          <div class="flex justify-between text-sm text-gray-500 mt-2">
            <a href="/forgot" class="hover:text-blue-600">Forgot your password?</a>
            <a href="/register" class="hover:text-blue-600">Register Here</a>
          </div>
        </form>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="border-t-2 border-gray-200 py-4 text-center text-gray-600">
    <p>© 2025 MyWebsite. All rights reserved.</p>
  </footer>

</body>
</html>
