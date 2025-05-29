import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MotionGraphics from '@/components/MotionGraphics';
import EnhancedAnimatedBackground from '@/components/EnhancedAnimatedBackground';

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const ContactItem = ({ icon, title, content, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex items-start space-x-4"
    >
      <div className="p-3 bg-cosmic-accent/10 text-cosmic-highlight rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-white/70">{content}</p>
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  // Form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulating form submission
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      form.reset();
    }, 1500);
  }
  
  return (
    <div className="min-h-screen relative flex flex-col">
      <MotionGraphics />
      <EnhancedAnimatedBackground />

      <div className="relative z-10 flex-grow">
        <Header />
        
        <main className="flex-grow pt-20">
          {/* Hero Section */}
          <section className="py-16">
            <motion.div 
              className="container mx-auto px-4 text-center"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold cosmic-text-gradient mb-6">Get In Touch</h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Have questions about our services? Ready to start a project? We're here to help you.
              </p>
            </motion.div>
          </section>
          
          {/* Contact Details & Form */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Information */}
                <div>
                  <motion.h2 
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold cosmic-text-gradient mb-8"
                  >
                    Contact Information
                  </motion.h2>
                  
                  <div className="space-y-8">
                    <ContactItem 
                      icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                      title="Phone"
                      content="+1 (555) 123-4567"
                      delay={0}
                    />
                    <ContactItem 
                      icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                      title="Email"
                      content="info@nexvora.com"
                      delay={0.1}
                    />
                    <ContactItem 
                      icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                      title="Office Location"
                      content="1234 Cosmic Drive, Tech District, Universe 42"
                      delay={0.2}
                    />
                  </div>
                  
                  <motion.div 
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-12"
                  >
                    <h3 className="text-2xl font-semibold mb-4">Office Hours</h3>
                    <div className="space-y-2 text-white/70">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 2:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </motion.div>
                </div>
                
                {/* Contact Form */}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-cosmic-subtle/30 backdrop-blur-sm p-8 rounded-xl border border-cosmic-accent/20"
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Send Us a Message</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} className="bg-cosmic-dark/50" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} className="bg-cosmic-dark/50" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Company" {...field} className="bg-cosmic-dark/50" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="How can we help you?" 
                                className="min-h-32 bg-cosmic-dark/50" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full cosmic-button" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Map Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-xl overflow-hidden border border-cosmic-accent/20 h-[400px] relative"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-cosmic-subtle/50">
                  <p className="text-white text-xl">Interactive Map Would Appear Here</p>
                </div>
              </motion.div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold cosmic-text-gradient mb-4">Frequently Asked Questions</h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Find quick answers to common questions about our services
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    question: "How quickly can you start on a new project?",
                    answer: "We can typically begin work within 1-2 weeks of finalizing project details and agreements. For urgent requests, we offer expedited onboarding processes."
                  },
                  {
                    question: "Do you offer customized solutions?",
                    answer: "Yes, all our services are tailored to meet the specific needs and goals of your business. We don't believe in one-size-fits-all approaches."
                  },
                  {
                    question: "How do you ensure data security?",
                    answer: "We implement industry-leading security protocols and comply with international data protection regulations. All client data is encrypted and access is strictly controlled."
                  },
                  {
                    question: "What industries do you serve?",
                    answer: "We work with clients across diverse sectors including finance, healthcare, technology, retail, manufacturing, and more. Our solutions are adaptable to various industry requirements."
                  }
                ].map((faq, i) => (
                  <motion.div 
                    key={i}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="bg-cosmic-subtle/30 backdrop-blur-sm p-6 rounded-xl border border-cosmic-accent/20"
                  >
                    <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                    <p className="text-white/70">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
