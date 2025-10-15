from app.core.embeddings import vector_store
from app.core.db import supabase
from langchain_community.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import os

# if you use OpenAI / Gemini / Ollama adjust here
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def refresh_mentor_embeddings():
    """Fetch mentors from Supabase and embed them."""
    res = supabase.table("mentors").select("*").execute()
    mentors = res.data or []
    docs = [f"{m['name']} skilled in {m['skill']} with {m['years_experience']} years experience" for m in mentors]
    vector_store.add_texts(docs, metadatas=mentors)
    vector_store.persist()
    return len(mentors)

def recommend_mentors(student_query: str):
    similar = vector_store.similarity_search(student_query, k=3)

    # Summarize using LLM as before
    llm = OpenAI(api_key=OPENAI_API_KEY, temperature=0.3)
    template = """You are matching students to mentors.
    Student need: {query}
    Mentors: {mentors}
    Pick the best matches and explain why briefly."""
    prompt = PromptTemplate(input_variables=["query", "mentors"], template=template)
    chain = LLMChain(llm=llm, prompt=prompt)

    mentor_text = "\n".join([f"{m.metadata['name']} ({m.metadata['skill']})" for m in similar])
    response = chain.run(query=student_query, mentors=mentor_text)

    # Sanitize output before returning
    safe_matches = []
    for doc in similar:
        m = doc.metadata
        safe_matches.append({
            "name": m.get("name"),
            "skill": m.get("skill"),
            "years_experience": m.get("years_experience"),
            "mode": m.get("mode"),
        })

    return {"matches": safe_matches, "summary": response}

    

