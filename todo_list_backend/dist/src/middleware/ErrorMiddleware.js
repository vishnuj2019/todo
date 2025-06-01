const handleError = (error) => {
    console.log("Error_Name", error.name);
    if (error.name == "CastError" && "path" in error) {
        error.message = `${error.path} must be ${error.kind}`;
    }
    if (error.name === "TokenExpiredError" && "expiredAt" in error) {
        const dateAndTime = new Date(error.expiredAt);
        error.message = `you have access with in ${dateAndTime}`;
    }
    if (error.name === "ValidationError" && "errors" in error) {
        const messages = Object.entries(error.errors).map(([_key, value]) => `${value.properties.path} should be ${value.properties.enumValues}`);
        error.message = messages?.[0].replaceAll(',', '|');
    }
    return error;
};
export const errorMiddleware = (err, _req, res, _next) => {
    const error = handleError(err);
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    if (process.env.NODE_ENV === "production") {
        res.status(statusCode).json({
            success: false,
            message,
        });
    }
    if (process.env.NODE_ENV === "development") {
        res.status(statusCode).json({
            success: false,
            message,
            error,
            stack: error.stack
        });
    }
};
//# sourceMappingURL=ErrorMiddleware.js.map