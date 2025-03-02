import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const logInRequest = createAsyncThunk('app/logInRequest', async (data) => {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/log-in`, {
        method: "POST",
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        response = await response.json()
        throw new Error(response.error || " Invalid Data");
    }

    return response.json();
});
export const signInRequest = createAsyncThunk('app/signInRequest', async (data) => {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/sign-in`, {
        method: "POST",
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        response = await response.json()
        throw new Error(response.error || " Invalid Data");
    }

    return response.json();
});

export const findFriendRequest = createAsyncThunk('app/findFriendRequest', async (data) => {

    const token = localStorage.getItem('token');
    if (token) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/find-friend`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Include the token in the Authorization header
            },
            body: JSON.stringify(data),  // Send the word to search for in the request body
        });

        // Handle response
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error finding word");
        }

        return response.json();
    }
    else {
        throw new Error("Token Not Found");
    }
});
export const addFriendRequest = createAsyncThunk('app/addFriendRequest', async (data) => {

    const token = localStorage.getItem('token');
    if (token) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/add-friend`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Include the token in the Authorization header
            },
            body: JSON.stringify(data),  // Send the word to search for in the request body
        });

        // Handle response
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error finding word");
        }

        return response.json();
    }
    else {
        throw new Error("Token Not Found");
    }
});


export const appSlice = createSlice({
    name: "app",
    initialState: {
        data: {},
        checking: false,
        error: null,
        isAuthentic: false,
        find: false,
        color1: 'rgb(0,0,255)',
        color2: 'rgb(0,0,0)',
        color3: 'rgb(255,255,255)',
        openCustom:false
    },
    reducers: {
        setColor1: (state, action) => {
            state.color1 = action.payload
        },
        setColor2: (state, action) => {
            state.color2 = action.payload
        },
        setColor3: (state, action) => {
            state.color3 = action.payload
        },
        clearError: (state) => {
            state.error = null
        },
        clearFind: (state) => {
            state.find = false
        },
        signOut: (state) => {
            state.isAuthentic = false
            localStorage.clear()
        },
        setIsAuthentic: (state) => {
            state.isAuthentic = true
        },
        setCustom:(state)=>{
            state.openCustom = !state.openCustom
        }

    }, extraReducers: (builder) => {
        builder
            .addCase(logInRequest.pending, (state) => {
                state.checking = true;
                state.error = null;
            })
            .addCase(logInRequest.fulfilled, (state, action) => {
                state.data = action.payload?.data
                state.isAuthentic = true
                const currentTime = new Date().getTime();
                let expireTime = 60 * 60 * 1000
                expireTime = currentTime + expireTime;
                localStorage.setItem('expiryTime', expireTime.toString());
                localStorage.setItem("token", action.payload.token)
                state.checking = false;
            })
            .addCase(logInRequest.rejected, (state, action) => {
                state.checking = false;
                alert(action.error.message);
            })


            .addCase(signInRequest.pending, (state) => {
                state.checking = true;
                state.error = null;
            })
            .addCase(signInRequest.fulfilled, (state, action) => {
                state.checking = false;

                alert("User Created")
            })
            .addCase(signInRequest.rejected, (state, action) => {
                state.checking = false;
                state.error = action.error.message;
            })

            .addCase(findFriendRequest.pending, (state) => {
                state.checking = true;
                state.error = null;
                state.find = false

            })
            .addCase(findFriendRequest.fulfilled, (state, action) => {
                state.checking = false;
                state.find = action.payload
            })
            .addCase(findFriendRequest.rejected, (state, action) => {
                state.checking = false;
                state.error = action.error.message;
            })

            .addCase(addFriendRequest.pending, (state) => {
                state.checking = true;
                state.error = null;
            })
            .addCase(addFriendRequest.fulfilled, (state, action) => {
                state.checking = false;
                if (action?.payload?.error === "exist") {
                    alert("Already Friended!")
                }
                else {
                    alert("friend added!")
                }
            })
            .addCase(addFriendRequest.rejected, (state, action) => {
                state.checking = false;
                state.error = action.error.message;
            });
    },
})


export const { clearError, setColor1, setColor2, setColor3, signOut, clearFind,setIsAuthentic,setCustom } = appSlice.actions;
export default appSlice.reducer;