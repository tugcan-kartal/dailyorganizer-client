const API_URL="http://13.51.47.163:3000/auth";

export const signUpUser=async(userData:any,setErrors:any,setSuccess:any,router:any)=>{

    setErrors([]);

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Kullanıcı verilerini gönder
      });

      if (!response.ok) {
        const data = await response.json();
        const errorMessages = Array.isArray(data.message)
          ? data.message
          : [data.message];
        setErrors(errorMessages);
      } else {
        const data = await response.json();
        console.log("Token:", data.token);

        localStorage.setItem("token", data.token);
        setSuccess("Signup successfully");
        setTimeout(()=>{
          router.push("/user/signin")
        },2000);
      }
    } catch (error) {
      console.error(error);
      setErrors(["An unexpected error occurred. Please try again later."]);
    }
}

export const signInUser=async(userData:any,setErrors:any,setSuccess:any,router:any)=>{

    setErrors([]);
    
        try {
          const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData), // Kullanıcı verilerini gönder
          });
    
          if (!response.ok) {
            const data = await response.json();
            const errorMessages = Array.isArray(data.message)
              ? data.message
              : [data.message];
            setErrors(errorMessages);
          } else {
            const data = await response.json();
            console.log("Token:", data.token);
    
            localStorage.setItem("token", data.token);
            setSuccess("Login successfully");
            setTimeout(() => {
              router.push("/tasks");
            }, 2000);
          }
        } catch (error) {
          console.error(error);
          setErrors(["An unexpected error occurred. Please try again later."]);
        }
}

export const getDetailUser=async(token: string)=>{
    try {
        const response=await fetch(`${API_URL}/user-details`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        const responseData=await response.json();
        return responseData;
    } catch (error) {
        console.log(error);
    }
}