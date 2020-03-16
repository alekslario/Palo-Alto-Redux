import React, { useEffect, useState } from "react";
import Link from "next/link";
import $ from "./_Blog";
import BlogPostPreview from "./BlogPostPreview";
import BlogPost from "./BlogPost";
const client = require("contentful").createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

const Navigation = () => {};

export default Navigation;
