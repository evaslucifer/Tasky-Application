class ApiResponse {
  constructor(statusCode, message = "succes", data) {
    this.statusCode = this.statusCode;
    this.data = this.data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
export { ApiResponse };
