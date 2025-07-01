import React from "react";
import logo from "./images/logo.png";
import heroicon from "./images/heroicon.svg";
import man from "./images/man.png";
import leadcolor from "./images/leadcolor.svg";
import leadwhite from "./images/leadwhite.svg";
import crntab from "./images/crntab.svg";
import crmwhite from "./images/crmwhite.svg";
import Inventorytab from "./images/Inventorytab.svg";
import Inventorytabwhite from "./images/Inventorytabwhite.svg";
import finance from "./images/finance.svg";
import financewhite from "./images/financewhite.svg";
import leadplay from "./images/leadplay.svg";
import invetory from "./images/invetory.svg";
import lead from "./images/lead.png";
import crm from "./images/crm.png";
import Inventory from "./images/Inventory.png";
import Finance from "./images/finance.png";
import plogo1 from "./images/plogo1.png";
import plogo2 from "./images/plogo2.png";
import plogo3 from "./images/plogo3.png";
import plogo4 from "./images/plogo4.png";
import plogo5 from "./images/plogo5.png";
import plogo6 from "./images/plogo6.png";
import business from "./images/business.png";
import businessSuccess from "./images/business-success.png";
import businessmen from "./images/businessmen.png";
import htmlSystem from "./images/html-system.png";
// import "./scss/main.css";
// import "./scss/main.css.map";
// import "./scss/main.scss";

const HTMLPage = () => {
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>TRYTHAT.ai</title>
          <!-- bootstra 5 css -->
          <link
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
              rel="stylesheet"
              integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
              crossorigin="anonymous" />
  
          <!-- custum css -->
          <link rel="stylesheet" href="./scss/main.css" />
  
          <!-- font family -->
          <link href="https://fonts.googleapis.com/css?family=Montserrat"
              rel="stylesheet" />
  
          <link href="https://fonts.googleapis.com/css?family=Quicksand"
              rel="stylesheet" />
  
          <!-- OwlCarousel -->
          <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />
  
          <!-- aos -->
          <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" />
          <link rel="stylesheet" href="https://unpkg.com/aos@2.3.0/dist/aos.css" />
      </head>
      <body>
          <!-- header start -->
          <header class="header">
              <div class="container">
                  <nav class="navbar navbar-expand-lg pt-4">
                      <a class="navbar-brand" href="#index.html"><img
                              src=${logo} class="img-fluid" /></a>
                      <button
                          class="navbar-toggler me-2"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#navbarTogglerDemo02"
                          aria-controls="navbarTogglerDemo02"
                          aria-expanded="false"
                          aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                      </button>
                      <div class="collapse navbar-collapse"
                          id="navbarTogglerDemo02">
                          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                              <li class="nav-item">
                                  <a class="nav-link active" aria-current="page"
                                      href="#home">Home</a>
                              </li>
                              <li class="nav-item">
                                  <a class="nav-link" href="#product">Product</a>
                              </li>
                              <li class="nav-item">
                                  <a class="nav-link" aria-current="page"
                                      href="#about">About</a>
                              </li>
                              <li class="nav-item">
                                  <a class="nav-link" href="#footer">Contact</a>
                              </li>
                              <li class="nav-item">
                                  <a class="nav-link" aria-current="page"
                                      href="#blog">Blog</a>
                              </li>
                              <li class="nav-item">
                                  <a class="nav-link" href="#">News</a>
                              </li>
                          </ul>
                          <div class="ms-lg-4 navbar__btn">
                              <a href="#" class="btn signinbtn fw-bold"> Sign In</a>
                              <a href="#" class="btn signupbtn"> Sign Up</a>
                          </div>
                      </div>
                  </nav>
              </div>
          </header>
  
          <!-- header end -->
          <div class="cs-height__150 cs-height__lg__50"></div>
          <!-- <div class="cs-height__80"></div> -->
  
          <!-- hero start -->
          <section class="hero__section mt-5" id="home">
              <div class="container">
                  <div class="row align-items-center">
                      <div class="col-lg-6">
                          <div class="hero__text" data-aos="zoom-in">
                              <span class="text__small__heading">AI POWERED APPS
                                  to TRANSFORM</span>
                              <h1 class="hero__title text__black lh-sm my-3">
                                  Empowering MSMEs <br />with
                                  <span>Next-Generation<br />
                                      AI Solutions</span>
                              </h1>
                              <p class="mb-4">
                                  TryThat.ai offers a suite of specialized tools
                                  designed to empower MSMEs in various aspects of
                                  their
                                  business operations. Each tool is crafted with
                                  the unique needs of small and medium businesses
                                  in mind,
                                  ensuring that you have the power of AI at your
                                  fingertips.
                              </p>
                              <div class="hero__btn">
                                  <a href="#" class="btn btn__explore px-3 py-2">Explore</a>
                                  <a href="#"
                                      class="btn text__small__heading fw-bold ms-2">
                                      <span class="me-2">
                                          <img src=${heroicon} />
                                      </span>Learn More</a>
                              </div>
                          </div>
                      </div>
                      <div class="col-lg-6">
                          <div class="hero__banner" data-aos="zoom-in">
                              <img src=${man}
                                  class="img-fluid p-lg-0 p-5" />
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          <!-- hero end -->
  
          <!-- Our Product start-->
          <section class="product" id="product">
              <div class="cs-height__150 cs-height__lg__50"></div>
              <div class="container">
                  <div class="row">
                      <div class="col-12 text-center">
                          <span class="text__small__heading" data-aos="slide-up">Our
                              Products</span>
                          <h2 class="text__black fw-900">Our Product Range</h2>
                      </div>
                  </div>
                  <div class="row mt-lg-5 mt-4">
                      <div class="col-12">
                          <div class="product__tab">
                              <ul
                                  class="nav nav-pills mb-3 d-flex justify-content-center"
                                  id="pills-tab" role="tablist">
                                  <li class="nav-item" role="presentation">
                                      <a
                                          class="nav-link adopt-tab active"
                                          id="pills-home-tab"
                                          data-bs-toggle="pill"
                                          data-bs-target="#pills-home"
                                          type="button"
                                          role="tab"
                                          aria-controls="pills-home"
                                          aria-selected="true">
                                          <div class="d-flex align-items-center">
                                              <span class="me-3">
                                                  <img class="svg__icon"
                                                      src=${leadcolor} />
                                                  <img class="svg__icon__white"
                                                      src=${leadwhite} />
                                              </span><span><b>Lead</b><br />
                                                  Generation</span>
                                          </div>
                                      </a>
                                  </li>
                                  <li class="nav-item" role="presentation">
                                      <a
                                          class="nav-link donate-tab"
                                          id="pills-profile-tab"
                                          data-bs-toggle="pill"
                                          data-bs-target="#pills-profile"
                                          type="button"
                                          role="tab"
                                          aria-controls="pills-profile"
                                          aria-selected="false">
                                          <div class="d-flex">
                                              <span class="me-3">
                                                  <img class="svg__icon"
                                                      src=${crntab} />
                                                  <img class="svg__icon__white"
                                                      src=${crmwhite} />
                                              </span><span> <b>CRM</b> <br />Tool
                                              </span>
                                          </div>
                                      </a>
                                  </li>
                                  <li class="nav-item" role="presentation">
                                      <a
                                          class="nav-link join-tab"
                                          id="pills-contact-tab"
                                          data-bs-toggle="pill"
                                          data-bs-target="#pills-contact"
                                          type="button"
                                          role="tab"
                                          aria-controls="pills-contact"
                                          aria-selected="false">
                                          <div class="d-flex align-items-center">
                                              <span class="me-3">
                                                  <img class="svg__icon"
                                                      src=${Inventorytab} />
                                                  <img class="svg__icon__white"
                                                      src=${Inventorytabwhite} />
                                              </span><span>
                                                  <b>Inventory</b>
                                                  <br />
                                                  Management
                                              </span>
                                          </div>
                                      </a>
                                  </li>
                                  <li class="nav-item" role="presentation">
                                      <a
                                          class="nav-link tools-tab"
                                          id="pills-tool-tab"
                                          data-bs-toggle="pill"
                                          data-bs-target="#pills-tool"
                                          type="button"
                                          role="tab"
                                          aria-controls="pills-tool"
                                          aria-selected="false">
                                          <div class="d-flex align-items-center">
                                              <span class="me-3">
                                                  <img class="svg__icon"
                                                      src=${finance} />
                                                  <img class="svg__icon__white"
                                                      src=${financewhite} />
                                              </span>
                                              <span><b>Finance</b><br />
                                                  Tool</span>
                                          </div>
                                      </a>
                                  </li>
                              </ul>
                              <div class="cs-height__80"></div>
                              <div class="tab-content" id="pills-tabContent">
                                  <div
                                      class="tab-pane fade show active adopt-tab"
                                      id="pills-home"
                                      role="tabpanel"
                                      aria-labelledby="pills-home-tab"
                                      tabindex="0">
                                      <div class="row">
                                          <div class="col-lg-8 mb-5">
                                              <div class="row position-relative">
                                                  <div class="col-10">
                                                      <img src=${lead}
                                                          class="img-fluid"
                                                          data-aos="fade-right" />
                                                  </div>
  
                                                  <div class="lead__card"
                                                      data-aos="zoom-in">
                                                      <h5
                                                          class="fw-bold text__lightblue mb-3">Discover
                                                          Your Next Opportunity</h5>
                                                      <p>
                                                          Elevate your career
                                                          journey with our
                                                          intuitive tools, robust
                                                          search options, and
                                                          personalized job.
                                                      </p>
                                                  </div>
                                              </div>
                                          </div>
  
                                          <div class="col-lg-4">
                                              <h3
                                                  class="text__lightblue text-uppercase">LEAD
                                                  GEN</h3>
                                              <h2
                                                  class="text__lightblue fw-900 my-3">
                                                  Generate Leads <br />with the
                                                  Power<br />
                                                  of AI !
                                              </h2>
                                              <p>
                                                  Elevate your customer
                                                  acquisition strategy with our
                                                  AI-powered LeadGen Platform.
                                                  Tailored for
                                                  efficiency and precision, this
                                                  tool helps you identify and
                                                  engage potential customers like
                                                  never before.”
                                              </p>
                                              <p class="fw-bold">Features:</p>
                                              <ul class="lead__list">
                                                  <li>
                                                      Advanced Targeting
                                                      Algorithms: Find the right
                                                      audience for your products
                                                      or services.”
                                                  </li>
                                                  <li>Automated Outreach: Engage
                                                      potential leads with
                                                      personalized communication.”</li>
                                                  <li>
                                                      Performance Analytics: Track
                                                      and optimize your lead
                                                      generation campaigns for
                                                      maximum ROI.
                                                  </li>
                                              </ul>
                                              <div class="lead__btn mt-4">
                                                  <a href="#"
                                                      class="btn px-3 py-2 lead__joinbtn px-4 fw-bold">Join
                                                      Now !</a>
                                                  <a href="#"
                                                      class="btn text__lightblue fw-bold ms-2"><span
                                                          class="me-2">
                                                          <img
                                                              src=${leadplay} />
                                                      </span>Learn More</a>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div
                                      class="tab-pane fade donate-tab"
                                      id="pills-profile"
                                      role="tabpanel"
                                      aria-labelledby="pills-profile-tab"
                                      tabindex="0">
                                      <div class="row align-items-center">
                                          <div class="col-lg-5 mb-5">
                                              <h3 class="text__purple">CRM for
                                                  Small Business</h3>
                                              <h2 class="text__purple fw-900 my-3">
                                                  Customer<br />
                                                  Relationships now<br />
                                                  made Smart !
                                              </h2>
                                              <p>
                                                  Manage your customer
                                                  relationships more effectively
                                                  with our AI-driven CRM solution.
                                                  Designed
                                                  for small businesses, this tool
                                                  streamlines your interactions
                                                  and enhances customer
                                                  satisfaction.
                                              </p>
                                              <p class="fw-bold">Features:</p>
                                              <ul class="lead__list">
                                                  <li>
                                                      Customer Data Integration:
                                                      Centralize all your customer
                                                      information for easy access
                                                      and
                                                      management.
                                                  </li>
                                                  <li>
                                                      Sales Pipeline Management:
                                                      Keep track of your sales
                                                      process and identify
                                                      opportunities for
                                                      growth.
                                                  </li>
                                                  <li>AI-Powered Insights: Gain
                                                      valuable insights into
                                                      customer behavior and
                                                      preferences.</li>
                                              </ul>
                                          </div>
                                          <div class="col-lg-7">
                                              <img src=${crm}
                                                  class="img-fluid ps-lg-5" />
                                          </div>
                                      </div>
                                  </div>
                                  <div
                                      class="tab-pane fade join-tab"
                                      id="pills-contact"
                                      role="tabpanel"
                                      aria-labelledby="pills-contact-tab"
                                      tabindex="0">
                                      <div class="row">
                                          <div class="col-lg-7 mb-5">
                                              <img src=${Inventory}
                                                  class="img-fluid" />
                                          </div>
  
                                          <div class="col-lg-5">
                                              <h3 class="text__yellow">Mini
                                                  Inventory Management</h3>
                                              <h2 class="text__yellow fw-900 my-3">Generate
                                                  Leads <br />with the Power <br />of
                                                  AI !</h2>
                                              <p>
                                                  Optimize your inventory with our
                                                  Mini Inventory Management Tool.
                                                  This compact yet powerful
                                                  solution helps you maintain the
                                                  perfect balance of stock,
                                                  ensuring efficiency and
                                                  cost-effectiveness.
                                              </p>
                                              <p class="fw-bold">Features:</p>
                                              <ul class="lead__list">
                                                  <li>
                                                      Real-Time Inventory
                                                      Tracking: Monitor your stock
                                                      levels in real-time to
                                                      prevent
                                                      overstocking or stockouts.”
                                                  </li>
                                                  <li>Automated Reordering: Set
                                                      custom thresholds for
                                                      automatic reordering of
                                                      products.”</li>
                                                  <li>
                                                      Inventory Analytics: Analyze
                                                      inventory trends and make
                                                      informed decisions on stock
                                                      management.”
                                                  </li>
                                              </ul>
                                              <div class="lead__btn mt-4">
                                                  <a href="#"
                                                      class="btn px-3 py-2 lead__joinbtn px-4 fw-bold">Join
                                                      Now !</a>
                                                  <a href="#"
                                                      class="btn text__yellow fw-bold ms-2"><span
                                                          class="me-2">
                                                          <img
                                                              src=${invetory} />
                                                      </span>
                                                      Learn More</a>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div
                                      class="tab-pane fade tools-tab"
                                      id="pills-tool"
                                      role="tabpanel"
                                      aria-labelledby="pills-tool-tab"
                                      tabindex="0">
                                      <div class="row align-items-center">
                                          <div class="col-lg-5 mb-5">
                                              <h3 class="text__green">Mini
                                                  Accounting for MSME</h3>
                                              <h2 class="text__green fw-900 my-3">
                                                  Accounting<br />
                                                  Made EASY !
                                              </h2>
                                              <p>
                                                  Simplify your financial
                                                  management with our Mini
                                                  Accounting Tool. This
                                                  user-friendly tool
                                                  helps you keep track of your
                                                  finances accurately and
                                                  effortlessly .
                                              </p>
                                              <p class="fw-bold">Features:</p>
                                              <ul class="lead__list">
                                                  <li>
                                                      Expense Tracking: Monitor
                                                      and categorize your business
                                                      expenses for better
                                                      financial
                                                      control.”
                                                  </li>
                                                  <li>
                                                      Revenue Management: Keep
                                                      track of your income streams
                                                      and enhance your revenue
                                                      strategies.”
                                                  </li>
                                                  <li>
                                                      Financial Reporting:
                                                      Generate detailed financial
                                                      reports for insights into
                                                      your business’s
                                                      financial health.”
                                                  </li>
                                              </ul>
                                          </div>
  
                                          <div class="col-lg-7">
                                              <img src=${Finance}
                                                  class="img-fluid ps-lg-5" />
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          <!-- Our Product end -->
          <div class="cs-height__150 cs-height__lg__50"></div>
          <!-- Passionate About Your Success start -->
          <section class="about" id="about">
              <div class="cs-height__80"></div>
              <div class="container">
                  <div class="row justify-content-center my-4">
                      <div class="col-xl-8 col-md-10 col-12 text-center">
                          <span class="text-white" data-aos="slide-up"><b>TRYTHAT
                                  AI</b>, a <b>ONE</b> stop solution</span>
                          <h2 class="text-white fw-900 my-3" data-aos="slide-up">Passionate
                              About Your Success</h2>
                          <h5 class="text-white lh-base" data-aos="slide-up">
                              Explore a diverse range of career possibilities
                              tailored to your skills and preferences. Our
                              user-friendly
                              interface streamlines your job search, providing
                              access to a plethora of openings across various
                              industries.
                              From entry-level positions to executive roles, we
                              connect talented individuals with reputable
                              employers
                          </h5>
                      </div>
                  </div>
              </div>
              <div class="cs-height__80"></div>
          </section>
          <!-- Passionate About Your Success end -->
  
          <!-- client start -->
          <section class="client" id="client">
              <div class="cs-height__150 cs-height__lg__50"></div>
              <div class="container">
                  <div class="row">
                      <div class="col-12 text-center">
                          <span class="text__small__heading" data-aos="slide-up">Our
                              Client</span>
                          <h2 class="text__black fw-900" data-aos="slide-up">Our
                              Trusted Partners</h2>
                      </div>
                      <div class="col-12">
                          <div class="owl-carousel owl-theme mt-5">
                              <div class="item"><img src=${plogo1}
                                      class="img-fluid" /></div>
                              <div class="item"><img src=${plogo2}
                                      class="img-fluid" /></div>
                              <div class="item"><img src=${plogo3}
                                      class="img-fluid" /></div>
                              <div class="item"><img src=${plogo4}
                                      class="img-fluid" /></div>
                              <div class="item"><img src=${plogo5}
                                      class="img-fluid" /></div>
                              <div class="item"><img src=${plogo6}
                                      class="img-fluid" /></div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          <!-- client end -->
  
          <!-- blog start-->
          <section class="blog section-padding" id="blog">
              <div class="cs-height__150 cs-height__lg__50"></div>
              <div class="container">
                  <div class="row">
                      <div class="col-12 text-center">
                          <span class="text__small__heading" data-aos="slide-up">Blogs</span>
                          <h2 class="text__black fw-900" data-aos="slide-up">Lorem
                              ipsum dolor sit amet</h2>
                      </div>
                  </div>
                  <div class="row mt-5">
                      <div
                          class="col-12 col-xl-3 col-md-6 pt-30 wow fadeInUp mb-4 mb-lg-0"
                          data-wow-duration="1s" data-wow-delay="0.2s">
                          <div class="single-blog-card style-1">
                              <img src=${business} class="img-fluid"
                                  data-aos="zoom-in" />
                              <div class="contents position-relative p-3">
                                  <div
                                      class="post-metabar d-flex justify-content-around align-items-center rounded-3">
                                      <div class="post-author">
                                          <a
                                              class="text-decoration-none text__black"
                                              href="#">Lorem ipsum | 11 Jan, 2024</a>
                                      </div>
                                  </div>
                                  <h4 class>
                                      <a
                                          class="text-decoration-none text__black fw-bold"
                                          href="#">Lorem ipsum dolor sit amet,
                                          consectetur adipiscing,</a>
                                  </h4>
  
                                  <div class="btn-wepper mt-4">
                                      <a
                                          href="#"
                                          class="btn text__small__heading px-3 py-2 fw-bold"
                                          style="border: 1px solid #023fac; border-radius: 5px">Read
                                          More</a>
                                  </div>
                              </div>
                          </div>
                      </div>
  
                      <div
                          class="col-12 col-xl-3 col-md-6 pt-30 wow fadeInUp mb-4 mb-lg-0"
                          data-wow-duration="1s" data-wow-delay="0.2s">
                          <div class="single-blog-card style-1">
                              <img src=${businessSuccess}
                                  class="img-fluid" data-aos="zoom-in" />
                              <div class="contents position-relative p-3">
                                  <div
                                      class="post-metabar d-flex justify-content-around align-items-center rounded-3">
                                      <div class="post-author">
                                          <a
                                              class="text-decoration-none text__black"
                                              href="#">Lorem ipsum | 11 Jan, 2024</a>
                                      </div>
                                  </div>
                                  <h4 class>
                                      <a
                                          class="text-decoration-none text__black fw-bold"
                                          href="#">Lorem ipsum dolor sit amet,
                                          consectetur adipiscing,</a>
                                  </h4>
  
                                  <div class="btn-wepper mt-4">
                                      <a
                                          href="#"
                                          class="btn text__small__heading px-3 py-2 fw-bold"
                                          style="border: 1px solid #023fac; border-radius: 5px">Read
                                          More</a>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div
                          class="col-12 col-xl-3 col-md-6 pt-30 wow fadeInUp mb-4 mb-lg-0"
                          data-wow-duration="1s" data-wow-delay="0.2s">
                          <div class="single-blog-card style-1">
                              <img src=${businessmen}
                                  class="img-fluid" data-aos="zoom-in" />
                              <div class="contents position-relative p-3">
                                  <div
                                      class="post-metabar d-flex justify-content-around align-items-center rounded-3">
                                      <div class="post-author">
                                          <a
                                              class="text-decoration-none text__black"
                                              href="#">Lorem ipsum | 11 Jan, 2024</a>
                                      </div>
                                  </div>
                                  <h4 class>
                                      <a
                                          class="text-decoration-none text__black fw-bold"
                                          href="#">Lorem ipsum dolor sit amet,
                                          consectetur adipiscing,</a>
                                  </h4>
  
                                  <div class="btn-wepper mt-4">
                                      <a
                                          href="#"
                                          class="btn text__small__heading px-3 py-2 fw-bold"
                                          style="border: 1px solid #023fac; border-radius: 5px">Read
                                          More</a>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div
                          class="col-12 col-xl-3 col-md-6 pt-30 wow fadeInUp mb-4 mb-lg-0"
                          data-wow-duration="1s" data-wow-delay="0.2s">
                          <div class="single-blog-card style-1">
                              <img src=${htmlSystem}
                                  class="img-fluid" data-aos="zoom-in" />
                              <div class="contents position-relative p-3">
                                  <div
                                      class="post-metabar d-flex justify-content-around align-items-center rounded-3">
                                      <div class="post-author">
                                          <a
                                              class="text-decoration-none text__black"
                                              href="#">Lorem ipsum | 11 Jan, 2024</a>
                                      </div>
                                  </div>
                                  <h4 class>
                                      <a
                                          class="text-decoration-none text__black fw-bold"
                                          href="#">Lorem ipsum dolor sit amet,
                                          consectetur adipiscing,</a>
                                  </h4>
  
                                  <div class="btn-wepper mt-4">
                                      <a
                                          href="#"
                                          class="btn text__small__heading px-3 py-2 fw-bold"
                                          style="border: 1px solid #023fac; border-radius: 5px">Read
                                          More</a>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          <div class="cs-height__150 cs-height__lg__50"></div>
          <!-- blog end -->
          <!-- footer start -->
          <footer class="footer" id="footer">
              <div class="footer-cta-wrapper">
                  <div class="container">
                      <div class="row justify-content-center">
                          <div class="col-md-10">
                              <div class="footer-cta-bg-wrapper">
                                  <div
                                      class="row justify-content-around align-items-center p-0">
                                      <div class="col-lg-7 col-12 mb-4 mb-lg-0">
                                          <div class="footer-middle-text">
                                              <span class="text__small__heading"
                                                  data-aos="slide-up">Lorem ipsum
                                                  dolor sit amet</span>
                                              <h2 class="text__black fw-900"
                                                  data-aos="slide-up">Lorem ipsum
                                                  dolor sit amet</h2>
                                          </div>
                                      </div>
                                      <div class="col-lg-4 ps-lg-0 col-12">
                                          <div
                                              class="footer-btn d-flex justify-content-end align-items-center">
                                              <div class="btn-wepper">
                                                  <a href="#" class="theme-btns">Contact
                                                      Now</a>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
  
              <div class="footer-widgets-wrapper text-white">
                  <div class="container">
                      <div class="row">
                          <div class="col-sm-6 col-md-6 col-xl-4 col-12">
                              <div class="footer-site-info">
                                  <a href="#index.html"
                                      class="h2 text-white text-decoration-none fw-bold">TryThat.ai</a>
                                  <p class="pt-3 pb-2">Sign up for our newsletter</p>
                                  <h5 class="fw-bold text-white pb-2">Jobsy - Job
                                      Finder Landing Page</h5>
                                  <p class>
                                      Explore a diverse range of career
                                      possibilities tailored to your skills and
                                      preferences. Our
                                      user-friendly interface streamlines your job
                                      search
                                  </p>
                                  <div class="footer-social-icon text-lg-md-end">
                                      <a href="#"><i class="fab fa-facebook-f"></i></a>
                                      <a href="#"><i class="fab fa-twitter"></i></a>
                                      <a href="#"><i class="fab fa-instagram"></i></a>
                                      <a href="#"><i class="fab fa-linkedin-in"></i></a>
                                      <a href="#"><i class="fab fa-youtube"></i></a>
                                  </div>
                              </div>
                          </div>
  
                          <div
                              class="col-12 col-sm-6 col-md-3 col-xl-2 pl-xl-5 offset-xl-1">
                              <div class="single-footer-wid">
                                  <div class="wid-title mb-3">
                                      <h5 class="fw-bold text-white">Information</h5>
                                  </div>
                                  <ul style="list-style-type: none" class="ps-2">
                                      <li>
                                          <a href="#" class="text-decoration-none"><p>Press
                                                  Centre</p></a>
                                      </li>
                                      <li>
                                          <a href="#" class="text-decoration-none"><p>Our
                                                  Blog</p></a>
                                      </li>
                                      <li>
                                          <a href="#" class="text-decoration-none"><p>Term
                                                  and Condition</p></a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
  
                          <div class="col-sm-6 col-xl-2 col-12 col-md-3">
                              <div class="single-footer-wid">
                                  <div class="wid-title mb-3">
                                      <h5 class="fw-bold text-white">Contact</h5>
                                  </div>
                                  <ul style="list-style-type: none" class="ps-2">
                                      <li>
                                          <a href="#" class="text-decoration-none"><p>Phone
                                                  : +123 456 789</p></a>
                                      </li>
                                      <li>
                                          <a href="#" class="text-decoration-none"><p>Email
                                                  : @example.com</p></a>
                                      </li>
                                      <li>
                                          <a href="#" class="text-decoration-none"><p>Address
                                                  Line 01</p></a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
  
                          <div class="col-sm-6 col-xl-3 col-12 ps-xl-5 col-md-6">
                              <div class="single-footer-wid">
                                  <div class="wid-title mb-3">
                                      <h5 class="fw-bold text-white">Menu</h5>
                                  </div>
                                  <ul style="list-style-type: none" class="ps-2">
                                      <li>
                                          <a href="#" class="text-decoration-none"><p>About</p></a>
                                      </li>
                                      <li>
                                          <a href="#" class="text-decoration-none"><p>Services</p></a>
                                      </li>
                                      <li>
                                          <a href="#" class="text-decoration-none"><p>Contact</p></a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </footer>
          <!-- footer end -->
          <script
              src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
              integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
              crossorigin="anonymous"></script>
          <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
          <!-- OwlCarousel js -->
          <script
              src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
  
          <script>
           $(".owl-carousel").owlCarousel({
              loop: true,
              margin: 10,
              // autoplay:true,
              nav: true,
              responsive: {
                 0: {
                    nav: false,
                    items: 1,
                 },
                 600: {
                    nav: false,
                    items: 3,
                 },
                 1000: {
                    items: 6,
                 },
              },
           });
        </script>
  
          <!-- aos js -->
          <script src="https://unpkg.com/aos@2.3.0/dist/aos.js"></script>
          <script>
           AOS.init();
        </script>
  
          <script>
        $(document).ready(function () {
      $(window).scroll(function () {
          var scroll = $(window).scrollTop();
          if (scroll > 200) {
              $(".header").css("background", "white");
              $(".header").css("box-shadow", "rgba(149, 157, 165, 0.2) 0px 8px 24px"); // Remove box-shadow when scroll is greater than 300
          } else {
              $(".header").css("background", "white");
              $(".header").css("box-shadow", "none");
          }
      });
  });
        </script>
      </body>
  </html>
  
  `;

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default HTMLPage;
