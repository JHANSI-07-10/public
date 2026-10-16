import { NextRequest, NextResponse } from 'next/server';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/octet-stream', // some browsers send this for docx
];
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const position = (formData.get('position') as string)?.trim();
    const workMode = (formData.get('workMode') as string)?.trim() || 'Hybrid';
    const fullName = (formData.get('fullName') as string)?.trim();
    const email = (formData.get('email') as string)?.trim();
    const phone = (formData.get('phone') as string)?.trim();
    const currentLocation = (formData.get('currentLocation') as string)?.trim() || '';

    const totalExperience = (formData.get('totalExperience') as string)?.trim();
    const currentCompany = (formData.get('currentCompany') as string)?.trim() || '';
    const currentDesignation = (formData.get('currentDesignation') as string)?.trim() || '';
    const keySkills = (formData.get('keySkills') as string)?.trim();
    const currentCtc = (formData.get('currentCtc') as string)?.trim() || '';
    const expectedCtc = (formData.get('expectedCtc') as string)?.trim();
    const noticePeriod = (formData.get('noticePeriod') as string)?.trim();

    const highestQualification = (formData.get('highestQualification') as string)?.trim();
    const college = (formData.get('college') as string)?.trim() || '';
    const yearOfPassing = (formData.get('yearOfPassing') as string)?.trim() || '';

    const linkedinUrl = (formData.get('linkedinUrl') as string)?.trim() || '';
    const portfolioUrl = (formData.get('portfolioUrl') as string)?.trim() || '';

    const hearAboutUs = (formData.get('hearAboutUs') as string)?.trim() || '';
    const referralName = (formData.get('referralName') as string)?.trim() || '';
    const coverNote = (formData.get('coverNote') as string)?.trim() || '';
    const consent = formData.get('consent');

    const resumeFile = formData.get('resume') as File | null;

    // 1. Validate required text fields
    const missingFields: string[] = [];
    if (!position) missingFields.push('Position');
    if (!fullName) missingFields.push('Full name');
    if (!email) missingFields.push('Email address');
    if (!phone) missingFields.push('Phone number');
    if (!totalExperience) missingFields.push('Total experience');
    if (!keySkills) missingFields.push('Key skills');
    if (!expectedCtc) missingFields.push('Expected CTC');
    if (!noticePeriod) missingFields.push('Notice period');
    if (!highestQualification) missingFields.push('Highest qualification');

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email address format. Please enter a valid email.',
        },
        { status: 400 }
      );
    }

    // 3. Validate phone number format (must contain at least 7 digits)
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid phone number format. Please include country code and valid digits.',
        },
        { status: 400 }
      );
    }

    // 4. Validate resume file
    if (!resumeFile || typeof resumeFile === 'string' || !(resumeFile instanceof Blob)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Resume file is required. Please upload a PDF or DOC/DOCX file.',
        },
        { status: 400 }
      );
    }

    if (resumeFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: 'Uploaded file exceeds the maximum allowed size of 5 MB.',
        },
        { status: 400 }
      );
    }

    const fileName = resumeFile.name.toLowerCase();
    const hasValidExt = ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext));
    if (!hasValidExt) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid file format. Only PDF, DOC, and DOCX files are accepted.',
        },
        { status: 400 }
      );
    }

    // 5. Validate consent
    if (consent !== 'true') {
      return NextResponse.json(
        {
          success: false,
          message: 'You must agree to recruitment data processing to submit.',
        },
        { status: 400 }
      );
    }

    // 6. Generate submission metadata & reference ID
    const submissionId = `VPD-APP-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toISOString();

    // Log application processing for audit & monitoring
    console.log(`[VPD Careers Application Received]`, {
      submissionId,
      timestamp,
      position,
      workMode,
      fullName,
      email,
      phone,
      currentLocation,
      totalExperience,
      currentCompany,
      currentDesignation,
      keySkills,
      currentCtc,
      expectedCtc,
      noticePeriod,
      highestQualification,
      college,
      yearOfPassing,
      linkedinUrl,
      portfolioUrl,
      hearAboutUs,
      referralName,
      coverNoteLength: coverNote.length,
      resume: {
        fileName: resumeFile.name,
        fileSize: resumeFile.size,
        type: resumeFile.type,
      },
      destinationInbox: 'info@vpdtechnologies.com',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thanks, we’ve received your application. Our team will contact you if your profile matches.',
        data: {
          submissionId,
          position,
          fullName,
          email,
          timestamp,
          inbox: 'info@vpdtechnologies.com',
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Error processing career application:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your application. Please try again or reach out to info@vpdtechnologies.com.',
      },
      { status: 500 }
    );
  }
}
