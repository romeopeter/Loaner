import React, { Component } from "react";
import { Link } from "react-router-dom";

export const tokenExpired = () => {
  return (
    <div>
      <h3 className="text-gray-300">
        Your current token is expired
        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
      </h3>

      <p className="text-gray-300">
        Try <Link to="/login">signing in</Link> again
      </p>
    </div>
  );
};

export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // Log error to error reporting services if needed
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState = { error, errorInfo };
  }

  render() {
    // Fallback UI
    if (this.state.hasError) {
      return <tokenExpired />;
    }
    return this.props.children;
  }
}
