import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./index.css"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App /> {/* App 컴포넌트 렌더링 */}
    </StrictMode>,
)
