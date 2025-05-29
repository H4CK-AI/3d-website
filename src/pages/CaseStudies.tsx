import { useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MotionGraphics from '@/components/MotionGraphics';
import EnhancedAnimatedBackground from '@/components/EnhancedAnimatedBackground';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

type CaseStudy = {
  id: string;
  title: string;
  client: string;
  industry: string;
  image: string;
  tags: string[];
  summary: string;
  results: {
    title: string;
    value: string;
  }[];
};

// Sample case studies data
const caseStudies: CaseStudy[] = [
  {
    id: "fin-tech-transformation",
    title: "FinTech Digital Transformation",
    client: "Global Bank Corp",
    industry: "Financial Services",
    image: "https://placehold.co/600x400/2a2a3a/ffffff?text=FinTech+Transformation",
    tags: ["Digital Transformation", "AI", "Banking"],
    summary: "Helped a leading financial institution modernize their legacy systems and implement AI-driven solutions, resulting in 40% faster transaction processing and improved customer satisfaction.",
    results: [
      { title: "Faster Transactions", value: "40%" },
      { title: "Cost Reduction", value: "35%" },
      { title: "Customer Satisfaction", value: "92%" }
    ]
  },
  {
    id: "healthcare-data",
    title: "Healthcare Data Management",
    client: "MedCare Solutions",
    industry: "Healthcare",
    image: "https://placehold.co/600x400/2a2a3a/ffffff?text=Healthcare+Data",
    tags: ["Data Management", "Healthcare", "Security"],
    summary: "Developed a secure and compliant data management system for a healthcare provider, enabling efficient access to patient records while maintaining strict privacy standards.",
    results: [
      { title: "Reduced Access Time", value: "65%" },
      { title: "Data Accuracy", value: "99.8%" },
      { title: "Compliance Score", value: "100%" }
    ]
  },
  {
    id: "ecommerce-scalability",
    title: "E-Commerce Platform Scalability",
    client: "ShopGlobal",
    industry: "Retail",
    image: "https://placehold.co/600x400/2a2a3a/ffffff?text=Ecommerce+Scalability",
    tags: ["E-Commerce", "Cloud", "Scalability"],
    summary: "Helped an online retailer scale their e-commerce platform to handle 10x traffic growth during peak seasons, eliminating downtime and boosting sales conversion rates.",
    results: [
      { title: "Platform Uptime", value: "99.99%" },
      { title: "Load Capacity", value: "10x" },
      { title: "Conversion Increase", value: "28%" }
    ]
  },
  {
    id: "legal-automation",
    title: "Legal Document Processing Automation",
    client: "LawFirst Partners",
    industry: "Legal",
    image: "https://placehold.co/600x400/2a2a3a/ffffff?text=Legal+Automation",
    tags: ["Legal", "Automation", "AI"],
    summary: "Implemented an AI-powered document analysis system for a law firm, reducing contract review time by 75% while maintaining accuracy and compliance.",
    results: [
      { title: "Review Time", value: "-75%" },
      { title: "Accuracy Rate", value: "96%" },
      { title: "Cost Savings", value: "$1.2M" }
    ]
  },
  {
    id: "supply-chain",
    title: "Supply Chain Optimization",
    client: "Global Manufacturing Inc.",
    industry: "Manufacturing",
    image: "https://placehold.co/600x400/2a2a3a/ffffff?text=Supply+Chain",
    tags: ["Supply Chain", "IoT", "Analytics"],
    summary: "Revolutionized a manufacturer's supply chain with IoT sensors and predictive analytics, reducing inventory costs and preventing production delays.",
    results: [
      { title: "Inventory Reduction", value: "32%" },
      { title: "Delay Prevention", value: "87%" },
      { title: "ROI", value: "310%" }
    ]
  },
  {
    id: "customer-service-ai",
    title: "AI-Powered Customer Service",
    client: "TeleTech Services",
    industry: "Telecommunications",
    image: "https://placehold.co/600x400/2a2a3a/ffffff?text=AI+Customer+Service",
    tags: ["Customer Service", "AI", "Automation"],
    summary: "Deployed an AI chatbot and intelligent routing system for a telecom provider, handling 65% of customer inquiries automatically with high satisfaction rates.",
    results: [
      { title: "Resolution Time", value: "-60%" },
      { title: "Self-Service Rate", value: "65%" },
      { title: "Satisfaction Score", value: "4.8/5" }
    ]
  }
];

// Filter options
const industries = ["All", "Financial Services", "Healthcare", "Retail", "Legal", "Manufacturing", "Telecommunications"];
const tags = ["Digital Transformation", "AI", "Banking", "Data Management", "Healthcare", "Security", "E-Commerce", "Cloud", "Scalability", "Legal", "Automation", "Supply Chain", "IoT", "Analytics", "Customer Service"];

const CaseStudyCard = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Card className="overflow-hidden border-cosmic-accent/20 h-full bg-cosmic-subtle/30 backdrop-blur-sm hover:border-cosmic-accent/40 transition-all duration-300 card-3d group">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={caseStudy.image}
            alt={caseStudy.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="shimmer absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-2 right-2">
            <Badge className="bg-cosmic-accent/80 hover:bg-cosmic-accent">{caseStudy.industry}</Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2">{caseStudy.title}</h3>
          <p className="text-white/50 text-sm mb-3">Client: {caseStudy.client}</p>
          <p className="text-white/70 mb-4 line-clamp-3">{caseStudy.summary}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {caseStudy.tags.slice(0, 2).map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs border-cosmic-highlight/30 text-cosmic-highlight">
                {tag}
              </Badge>
            ))}
            {caseStudy.tags.length > 2 && (
              <Badge variant="outline" className="text-xs border-cosmic-highlight/30 text-cosmic-highlight">
                +{caseStudy.tags.length - 2}
              </Badge>
            )}
          </div>
          <Link to={`/case-studies/${caseStudy.id}`} className="inline-block">
            <Button variant="ghost" className="text-cosmic-highlight hover:text-cosmic-highlight/80 hover:bg-cosmic-accent/10 p-0">
              Read Case Study
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const CaseStudies = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const containerRef = useRef(null);
  
  // Filter case studies
  const filteredCaseStudies = caseStudies.filter((study) => {
    // Filter by industry
    if (selectedIndustry !== "All" && study.industry !== selectedIndustry) {
      return false;
    }
    
    // Filter by tags
    if (selectedTags.length > 0 && !selectedTags.some(tag => study.tags.includes(tag))) {
      return false;
    }
    
    // Filter by search
    if (
      searchQuery && 
      !study.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !study.client.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !study.summary.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    return true;
  });
  
  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => 
      prev.includes(tag) 
        ? prev.filter((t) => t !== tag) 
        : [...prev, tag]
    );
  };
  
  return (
    <div className="min-h-screen relative">
      <MotionGraphics />
      <EnhancedAnimatedBackground />
      
      <div className="relative z-10">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative py-20 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-3xl mx-auto"
              >
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold cosmic-text-gradient mb-6"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  Success Stories
                </motion.h1>
                <motion.p 
                  className="text-xl text-white/70 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Explore how we've helped businesses across industries overcome challenges and achieve remarkable results
                </motion.p>
                
                <motion.div 
                  className="relative"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <input
                    type="text"
                    placeholder="Search case studies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-10 bg-cosmic-subtle/30 backdrop-blur-sm border border-cosmic-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmic-accent/50 text-white"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </section>
          
          {/* Filters Section */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Filter by Industry</h2>
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry, i) => (
                    <motion.button
                      key={industry}
                      onClick={() => setSelectedIndustry(industry)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                        selectedIndustry === industry 
                          ? "bg-cosmic-accent text-white" 
                          : "bg-cosmic-subtle/30 border border-cosmic-accent/20 text-white/70 hover:bg-cosmic-accent/20"
                      }`}
                    >
                      {industry}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Filter by Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 12).map((tag, i) => (
                    <motion.button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                      className={`px-3 py-1 rounded-full text-xs transition-all duration-300 ${
                        selectedTags.includes(tag)
                          ? "bg-cosmic-highlight text-cosmic-dark"
                          : "bg-transparent border border-cosmic-highlight/30 text-cosmic-highlight hover:bg-cosmic-highlight/10"
                      }`}
                    >
                      {tag}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </section>
          
          {/* Case Studies Grid */}
          <section className="py-12" ref={containerRef}>
            <div className="container mx-auto px-4">
              <AnimatePresence>
                {filteredCaseStudies.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16"
                  >
                    <h3 className="text-2xl font-semibold mb-2">No matching case studies</h3>
                    <p className="text-white/70">Try adjusting your filters or search criteria</p>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCaseStudies.map((study) => (
                      <CaseStudyCard key={study.id} caseStudy={study} />
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-cosmic-subtle to-cosmic-accent/30 backdrop-blur-md border border-cosmic-accent/20 rounded-xl p-8 md:p-12 text-center"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 cosmic-text-gradient">Ready to Be Our Next Success Story?</h2>
                <p className="text-white/70 max-w-2xl mx-auto mb-8">
                  Partner with Nexvora to transform your business operations and achieve extraordinary results. Our team of experts is ready to help you navigate the challenges of modern business.
                </p>
                <Link to="/contact">
                  <Button className="cosmic-button text-lg px-8">Contact Us Today</Button>
                </Link>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default CaseStudies;
