import { Component } from 'react'
import { AlertTriangle } from 'lucide-react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 app-background">
          <div className="glass rounded-xl p-8 border border-infra-border max-w-md w-full text-center">
            <AlertTriangle size={48} className="text-critical mx-auto mb-4" />
            <h2 className="font-heading font-bold text-2xl text-white mb-2">Something went wrong</h2>
            <p className="text-infra-muted mb-6">
              An unexpected error occurred. Please refresh the page or contact support.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-4 p-4 bg-infra-bg rounded-lg text-left text-xs text-infra-muted overflow-auto max-h-32">
                <p className="font-bold text-critical mb-1">Error:</p>
                <p>{this.state.error.toString()}</p>
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
