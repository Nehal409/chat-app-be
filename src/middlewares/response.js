const responseMiddleware = (req, res, next) => {
  // Override the default res.json method
  const oldJson = res.json;

  res.json = function (data) {
    const structuredResponse = {
      success: res.statusCode >= 200 && res.statusCode < 300,
      status: res.statusCode,
      message: data.message || "Request processed successfully",
      data: data.data || null,
      error: data.error || null,
    };

    oldJson.call(this, structuredResponse);
  };

  next();
};

export default responseMiddleware;
