const UserModal = () => {
    const inputcss = 'outline-none bg-transparent rounded-lg '
    return (
        <div className="absolute top-[20%] left-1/3 z-99 bg-primaryColor  rounded-lg border-white border-2 p-6 transition-opacity-300">
            <form className="flex flex-col gap-2 mt-10">
                <input
                    type="text"
                    autoFocus
                    placeholder="First Name"
                    required
                    className={`${inputcss}`}
                />
                <input
                    type="text"
                    placeholder=" Last Name"
                    required
                    className={`${inputcss}`}
                />
                <input
                    type="text"
                    placeholder="Email"
                    required
                    className={`${inputcss}`}
                />
                <input
                    type="number"
                    min={1}
                    placeholder="children(optional)"
                    className={`${inputcss}`}
                />
                <input
                    type="date"
                    placeholder="DOB"
                    required
                    className={`${inputcss}`}
                />
                <input
                    type="file"
                    placeholder="DOB"
                    className={`${inputcss}`}
                />
                <button className="bg-blue-extralight rounded-lg p-2 text-white">
                    Add
                </button>
            </form>
        </div>
    )
}

export default UserModal
