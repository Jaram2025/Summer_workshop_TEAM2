from fastapi.testclient import TestClient
from app.main import app
import pytest
from unittest.mock import patch

client = TestClient(app)

def test_read_root():
    response = client.get