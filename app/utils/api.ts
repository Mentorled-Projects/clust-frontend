
export async function signupUser(userData: {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    confirm_password: string;
}) {

    try{
        const res = await fetch("http://188.166.174.141:8000/api/v1/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (!res.ok) throw new Error("Signup failed");
        return await res.json();
    } catch (error){
        throw error;
    }
     }
