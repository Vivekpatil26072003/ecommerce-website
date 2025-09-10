"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "We've received your message and will get back to you soon!",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="container py-12 items-center justify-between max-w-full">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left side - Contact Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-6 h-6 text-gray-500" />
            <span className="text-gray-700">contact@yourdomain.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-6 h-6 text-gray-500" />
            <span className="text-gray-700">+123 456 7890</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-6 h-6 text-gray-500" />
            <span className="text-gray-700">123 Street, City, Country</span>
          </div>
        </div>

        {/* Right side - Contact Form */}
        <form 
  onSubmit={handleSubmit} 
  className="space-y-4 bg-white p-6 shadow-md rounded-lg dark:bg-gray-900 dark:text-white"
>
  <div>
    <Label htmlFor="name">Name</Label>
    <Input 
      id="name" 
      name="name" 
      value={formData.name} 
      onChange={handleChange} 
      required 
      className="bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
    />
  </div>
  <div>
    <Label htmlFor="email">Email</Label>
    <Input 
      id="email" 
      name="email" 
      type="email" 
      value={formData.email} 
      onChange={handleChange} 
      required 
      className="bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
    />
  </div>
  <div>
    <Label htmlFor="subject">Subject</Label>
    <Input 
      id="subject" 
      name="subject" 
      value={formData.subject} 
      onChange={handleChange} 
      required 
      className="bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
    />
  </div>
  <div>
    <Label htmlFor="message">Message</Label>
    <Textarea 
      id="message" 
      name="message" 
      value={formData.message} 
      onChange={handleChange} 
      required 
      className="bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
    />
  </div>
  <Button 
    type="submit" 
    disabled={isSubmitting} 
    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
  >
    {isSubmitting ? "Sending..." : "Send Message"}
    <Send className="w-4 h-4" />
  </Button>
</form>

      </div>
    </div>
  );
}