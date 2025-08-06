const UserProfile = () => {
return (
    <div className="user-profile bg-gray-100 hover:shadow-xl sm:p-4 max-w-xs md:p-8 md:max-w-sm mx-auto my-20 rounded-lg shadow-lg">
        <img src="https://fastly.picsum.photos/id/12/200/200.jpg?hmac=cX-VZ_FED6NC7EKPOnEaNhQEKw6Dy85IfsKItBkkGWA" alt="User" className="rounded-full hover:scale-110 transition-transform duration-300 ease-in-out sm:w-24 sm:h-24 md:w-36 md:h-36 mx-auto" />
    <h1 className="sm:text-lg md:text-xl text-blue-800 hover:text-blue-500 my-4">John Doe</h1>
    <p className="sm:text-sm md:text-base text-gray-600">Developer at Example Co. Loves to write code and explore new technologies.</p>
    </div>
)
}

export default UserProfile
