import React, { Component } from "react";

const ErrorComponent = () => {
  return (
    <div className="container">
      <div className="text-center w-50  bg-dark m-auto">
        <h3 className="text-light pt-4 pb-4">Something went wrong</h3>
      </div>
    </div>
  );
};

export class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: { message: "", stack: "" },
    info: { componentStack: "" },
  };

  static getDerivedStateFromError = (error) => {
    return { hasError: true };
  };

  componentDidCatch = (error, info) => {
    this.setState({ error, info });
  };

  render() {
    const { hasError, error, info } = this.state;
    console.log(error, info);
    const { children } = this.props;

    return hasError ? <ErrorComponent /> : children;
  }
}
