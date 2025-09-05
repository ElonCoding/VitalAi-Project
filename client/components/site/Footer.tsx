import { Logo } from "./Logo";
import { Link } from "react-router-dom";
import { Github, Linkedin, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-sm">
              AI-driven healthcare platform for clinical decision support, patient triage, and secure data intelligence.
            </p>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span className="text-xs">HIPAA-ready • SOC2-aware practices</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 md:col-span-2 md:justify-items-end">
            <div>
              <h4 className="mb-3 text-sm font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/solutions" className="hover:text-foreground">Solutions</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Security</a></li>
                <li><a href="#" className="hover:text-foreground">Compliance</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
              </ul>
              <div className="mt-4 flex gap-3">
                <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-foreground"><Github className="h-5 w-5" /></a>
                <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground"><Linkedin className="h-5 w-5" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} VitalAI Health. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
