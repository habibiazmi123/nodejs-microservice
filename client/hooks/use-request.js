import axios from "axios";
import { useState } from "react";

const useRequest = ({url, method, body, onSuccess}) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null);

            const response = await axios[method](url, body);

            if (onSuccess) {
                onSuccess(response.data);
            }

            return response.data;
        } catch (error) {
            setErrors(
                <div className="alert alert-danger my-2">
                    <h4>Oops..</h4>
                    <ul>
                        {error.response?.data?.errors.map((err, index) => (
                            <li key={index}>{err.message}</li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    return { doRequest, errors };
}

export default useRequest;