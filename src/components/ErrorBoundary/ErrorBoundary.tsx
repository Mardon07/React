import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryState {
    hasError: boolean;
  }

  interface ErrorBoundaryProps {
    children: ReactNode;
  }

  class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(): ErrorBoundaryState {
      return { hasError: true };
    }
  
    componentDidCatch(error: Error, info: ErrorInfo) {
      console.error("ErrorBoundary caught an error", error, info);
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>Что-то пошло не так. Пожалуйста, попробуйте позже.</h1>;
      }
  
      return this.props.children; 
    }
  }
  
  export default ErrorBoundary;