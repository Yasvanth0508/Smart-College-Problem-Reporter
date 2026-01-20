import Issue from "../models/Issue.js";
import { analyzeIssueWithAI } from "../services/ai.service.js";


export const createIssue = async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;

    // 1. Basic validation
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required"
      });
    }

    // 2. Call AI service
    const aiResult = await analyzeIssueWithAI(description);

    // 3. Create issue document
    const issue = await Issue.create({
      title,
      description,
      summary: aiResult.summary,
      category: aiResult.category,
      priority: aiResult.priority,
      imageUrl: imageUrl || "",
      createdBy: req.user.id
    });

    // 4. Return created issue
    return res.status(201).json({
      message: "Issue created successfully",
      issue
    });
  } catch (error) {
    console.error("Create issue error:", error);
    return res.status(500).json({
      message: "Failed to create issue"
    });
  }
};

export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch issues" });
  }
};

export const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = ["unsolved", "in_progress", "solved"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const issue = await Issue.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

export const getMyIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (err) {
    console.error("Get my issues error:", err);
    res.status(500).json({ message: "Failed to fetch your issues" });
  }
};
